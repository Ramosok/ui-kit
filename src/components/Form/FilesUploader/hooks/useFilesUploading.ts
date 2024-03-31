import { useDropzone, Accept as DropzoneAcceptType, DropEvent, FileRejection } from 'react-dropzone';
import type { FilesUploaderConfig, FilesUploaderErrors, FilesUploaderFile } from '../interface';
import { FILES_UPLOADER_MIME_TYPES } from '../const';
import type { HTMLAttributes } from 'react';
import { useCallback } from 'react';
import { convertMegabytesToBytes } from 'core/helpers';

export interface UseFilesUploadingInput {
    uploadedFilesLength: number;
    onUploadFiles(files: FilesUploaderFile[], hasErrors: boolean): void;
    onUploadReject?: (fileRejections: { files: File[]; errors: FilesUploaderErrors }, event?: DropEvent) => void;
    config?: FilesUploaderConfig;
    disableDragAndDrop?: boolean;
    onFileDialogOpen?: () => void;
    onFileDialogCancel?: () => void;
    onError?: (err: Error) => void;
    multiple?: boolean;
    allowUploadFileReplace?: boolean;
    disabled?: boolean;
    disabledWhenMaxFilesUploaded?: boolean;
}

export interface UseFilesUploadingOutput {
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
    isFileDialogActive: boolean;
    getRootProps: (props?: HTMLAttributes<HTMLElement>) => HTMLAttributes<HTMLElement>;
    getInputProps: (props?: HTMLAttributes<HTMLInputElement>) => HTMLAttributes<HTMLInputElement>;
    removeUploadedFile(files: FilesUploaderFile[], fileId: FilesUploaderFile['id']): FilesUploaderFile[];
    openFilesDialog(): void;
    getUploadedFiles(
        currentFiles: FilesUploaderFile[],
        newUploadedFiles: FilesUploaderFile[]
    ): { files: FilesUploaderFile[]; isUploadedFilesReplaced: boolean };
    convertToFilesUploaderFile(files: File[]): FilesUploaderFile[];
    isUploadNewFilesDisabled(): boolean;
    uploadFilesConfig: FilesUploaderConfig;
}

export const useFilesUploading = ({
    uploadedFilesLength,
    onUploadFiles,
    onUploadReject,
    config,
    disableDragAndDrop,
    onFileDialogOpen,
    onFileDialogCancel,
    onError,
    multiple = true,
    allowUploadFileReplace,
    disabled,
    disabledWhenMaxFilesUploaded,
}: UseFilesUploadingInput): UseFilesUploadingOutput => {
    const getAccepted = (): DropzoneAcceptType | null => {
        if (!config?.acceptFilesExtensions?.length) {
            return null;
        }

        return (config?.acceptFilesExtensions || []).reduce<DropzoneAcceptType>((acc, fileExtension) => {
            const mimeType = FILES_UPLOADER_MIME_TYPES[fileExtension];
            if (acc[mimeType]) {
                acc[mimeType].push(fileExtension);
            } else {
                acc[mimeType] = [fileExtension];
            }
            return acc;
        }, {});
    };

    const convertToFilesUploaderFile = (files: File[]): FilesUploaderFile[] =>
        files.map((file) => ({
            id: Math.random().toString(),
            originalFile: file,
        }));

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]): void => {
            if (config?.maxFiles && uploadedFilesLength >= config?.maxFiles && !allowUploadFileReplace) {
                onUploadReject({
                    errors: { maxFilesToUpload: true },
                    files: acceptedFiles,
                });
            } else {
                onUploadFiles(convertToFilesUploaderFile(acceptedFiles), fileRejections.length > 0);
            }
        },
        [uploadedFilesLength, allowUploadFileReplace, config?.maxFiles]
    );

    const onDropRejected = useCallback((fileRejections: FileRejection[], event: DropEvent): void => {
        const errors: FilesUploaderErrors = fileRejections.reduce<FilesUploaderErrors>((acc, fileRejection) => {
            fileRejection.errors.forEach((error) => {
                if (error.code === 'file-invalid-type') {
                    acc.fileExtension = true;
                }
                if (error.code === 'file-too-large') {
                    acc.fileSizeMax = true;
                }
                if (error.code === 'file-too-small') {
                    acc.fileSizeMin = true;
                }
                if (error.code === 'too-many-files') {
                    acc.maxFilesToUpload = true;
                }
            });
            return acc;
        }, {});

        onUploadReject(
            {
                files: fileRejections.map((fileRejection) => fileRejection.file),
                errors,
            },
            event
        );
    }, []);

    const isUploadNewFilesDisabled = (): boolean => {
        if (config?.maxFiles) {
            return uploadedFilesLength >= config?.maxFiles || !!disabled;
        }

        return !!disabled;
    };

    const getDisabled = (): boolean => {
        if (disabledWhenMaxFilesUploaded) {
            return isUploadNewFilesDisabled();
        }

        return !!disabled;
    };

    const {
        isDragActive,
        isDragAccept,
        isDragReject,
        isFileDialogActive,
        getRootProps: getRootPropsParam,
        getInputProps: getInputPropsParam,
        open,
    } = useDropzone({
        onDrop,
        onDropRejected,
        accept: getAccepted(),
        minSize: config?.minSizeInMB ? convertMegabytesToBytes(config?.minSizeInMB) : 0,
        maxSize: config?.maxSizeInMB ? convertMegabytesToBytes(config?.maxSizeInMB) : Infinity,
        maxFiles: allowUploadFileReplace ? 0 : config?.maxFiles || 0,
        noDrag: disableDragAndDrop,
        onFileDialogOpen,
        onFileDialogCancel,
        onError,
        multiple,
        useFsAccessApi: false,
        disabled: getDisabled(),
    });

    const removeUploadedFile = (files: FilesUploaderFile[], fileId: FilesUploaderFile['id']): FilesUploaderFile[] =>
        files.filter((file) => file.id !== fileId);

    const getRootProps = (props?: HTMLAttributes<HTMLElement>): HTMLAttributes<HTMLElement> =>
        getRootPropsParam<HTMLAttributes<HTMLElement>>(props);

    const getInputProps = (props?: HTMLAttributes<HTMLInputElement>): HTMLAttributes<HTMLInputElement> =>
        getInputPropsParam<HTMLAttributes<HTMLInputElement>>(props);

    const validateUploadedFiles = (files: FilesUploaderFile[]): FilesUploaderFile[] => {
        if (config?.maxFiles > 0) {
            return files.slice(0, config?.maxFiles);
        }
        return files;
    };

    const getUploadedFiles = (
        currentFiles: FilesUploaderFile[],
        newUploadedFiles: FilesUploaderFile[]
    ): { files: FilesUploaderFile[]; isUploadedFilesReplaced: boolean } => {
        if (config?.maxFiles && currentFiles.length >= config?.maxFiles && allowUploadFileReplace) {
            return {
                files: validateUploadedFiles(newUploadedFiles),
                isUploadedFilesReplaced: true,
            };
        }

        return {
            files: validateUploadedFiles(currentFiles.concat(newUploadedFiles)),
            isUploadedFilesReplaced: false,
        };
    };

    return {
        isDragActive,
        isDragAccept,
        isDragReject,
        isFileDialogActive,
        getRootProps,
        getInputProps,
        removeUploadedFile,
        openFilesDialog: open,
        getUploadedFiles,
        convertToFilesUploaderFile,
        isUploadNewFilesDisabled,
        uploadFilesConfig: config || {},
    };
};
