import React, { useState } from 'react';
import { UploadFilesButton } from './components/UploadFilesButton/UploadFilesButton';
import { FilesDragAndDropArea } from './components/FilesDragAndDropArea/FilesDragAndDropArea';
import { useFilesUploading } from './hooks/useFilesUploading';
import type { FilesUploaderErrors, FilesUploaderFile, FilesUploaderFileExtension } from './interface';
import { UploadedFilesList } from './components/UploadedFilesList/UploadedFilesList';
import styles from './FilesUploader.stories.module.scss';
import type { Story } from '@storybook/react';

export default {
    title: 'components/Form/FilesUploader',
    component: (): null => null,
    args: {
        acceptFilesExtensions: ['.png', '.pdf'],
        minSizeInMB: 0,
        maxSizeInMB: 10,
        maxFiles: 3,
        multiple: true,
        allowUploadFileReplace: false,
        disabled: false,
        disabledWhenMaxFilesUploaded: true,
        disableDragAndDrop: false,
    },
    argTypes: {
        minSizeInMB: {
            control: { type: 'number', min: 0, step: 1 },
        },
        maxSizeInMB: {
            control: { type: 'number', min: 0, step: 1 },
        },
        maxFiles: {
            control: { type: 'number', min: 0, step: 1 },
        },
    },
};

interface FilesUploaderStoryProps {
    acceptFilesExtensions: FilesUploaderFileExtension[];
    minSizeInMB: number;
    maxSizeInMB: number;
    maxFiles: number;
    multiple: boolean;
    allowUploadFileReplace: boolean;
    disabled: boolean;
    disabledWhenMaxFilesUploaded: boolean;
    disableDragAndDrop: boolean;
}

export const FilesUploaderDndAndButtonTemplate: Story<FilesUploaderStoryProps> = ({
    acceptFilesExtensions,
    minSizeInMB,
    maxSizeInMB,
    maxFiles,
    multiple,
    allowUploadFileReplace,
    disabled,
    disabledWhenMaxFilesUploaded,
    disableDragAndDrop,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<FilesUploaderFile[]>([]);
    const [filesUploadErrors, setFilesUploadErrors] = useState<FilesUploaderErrors>({});
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        removeUploadedFile,
        openFilesDialog,
        uploadFilesConfig,
        getUploadedFiles,
    } = useFilesUploading({
        uploadedFilesLength: uploadedFiles.length,
        onUploadFiles(files: FilesUploaderFile[], hasErrors) {
            const { files: finalFiles } = getUploadedFiles(uploadedFiles, files);
            setUploadedFiles(finalFiles);
            if (!hasErrors) {
                setFilesUploadErrors({});
            }
        },
        onUploadReject({ errors }) {
            setFilesUploadErrors(errors);
        },
        config: {
            acceptFilesExtensions,
            maxFiles,
            maxSizeInMB,
            minSizeInMB,
        },
        multiple,
        allowUploadFileReplace,
        disabled,
        disabledWhenMaxFilesUploaded,
        disableDragAndDrop,
    });

    const removeUploadedFileFromList = (fileId: FilesUploaderFile['id']): void => {
        setUploadedFiles((prevFiles) => removeUploadedFile(prevFiles, fileId));
    };

    const getUploadErrorMessage = (): string | null => {
        switch (true) {
            case filesUploadErrors.maxFilesToUpload:
                return `Можно загрузить максимально ${uploadFilesConfig.maxFiles}`;
            case filesUploadErrors.fileSizeMax:
                return `Максимальный размер файла ${uploadFilesConfig.maxSizeInMB}mb`;
            case filesUploadErrors.fileSizeMin:
                return `Минимальный размер файла ${uploadFilesConfig.maxSizeInMB}mb`;
            case filesUploadErrors.fileExtension:
                return `Доступные форматы файлов для загрузки: ${(uploadFilesConfig.acceptFilesExtensions || [])
                    .join(', ')
                    .toUpperCase()}`;
            default:
                return null;
        }
    };

    const errorMessage = getUploadErrorMessage();

    return (
        <div>
            <input type="file" {...getInputProps()} />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <FilesDragAndDropArea {...getRootProps()} className={styles.dropOverlayArea} isDragActive={isDragActive}>
                * Drop Zone *
            </FilesDragAndDropArea>
            <UploadFilesButton title="Загрузить" onClick={openFilesDialog} />
            <UploadedFilesList files={uploadedFiles} removeFromList={removeUploadedFileFromList} />
        </div>
    );
};

FilesUploaderDndAndButtonTemplate.storyName = 'Files Uploader (dnd + button)';

export const FilesUploaderOnlyButtonTemplate: Story<FilesUploaderStoryProps> = ({
    acceptFilesExtensions,
    minSizeInMB,
    maxSizeInMB,
    maxFiles,
    multiple,
    allowUploadFileReplace,
    disabled,
    disabledWhenMaxFilesUploaded,
    disableDragAndDrop,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<FilesUploaderFile[]>([]);
    const { getInputProps, removeUploadedFile, openFilesDialog, getUploadedFiles } = useFilesUploading({
        uploadedFilesLength: uploadedFiles.length,
        onUploadFiles(files: FilesUploaderFile[]) {
            setUploadedFiles((prevFiles) => getUploadedFiles(prevFiles, files).files);
        },
        config: {
            acceptFilesExtensions,
            maxFiles,
            maxSizeInMB,
            minSizeInMB,
        },
        multiple,
        allowUploadFileReplace,
        disabled,
        disabledWhenMaxFilesUploaded,
        disableDragAndDrop,
    });

    const removeUploadedFileFromList = (fileId: FilesUploaderFile['id']): void => {
        setUploadedFiles((prevFiles) => removeUploadedFile(prevFiles, fileId));
    };

    return (
        <div>
            <input type="file" {...getInputProps()} />
            <UploadFilesButton title="Загрузить" onClick={openFilesDialog} />
            <UploadedFilesList files={uploadedFiles} removeFromList={removeUploadedFileFromList} />
        </div>
    );
};

FilesUploaderOnlyButtonTemplate.storyName = 'Files Uploader (only button)';
