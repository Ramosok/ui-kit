export interface FilesUploaderFile {
    id: string;
    originalFile: File;
}

export interface FilesUploaderErrors {
    fileSizeMax?: boolean;
    fileSizeMin?: boolean;
    fileExtension?: boolean;
    maxFilesToUpload?: boolean;
}

export type FilesUploaderFileExtension = '.jpg' | '.jpeg' | '.png' | '.pdf' | '.tiff' | '.xlsx' | '.xls';

export interface FilesUploaderConfig {
    acceptFilesExtensions?: FilesUploaderFileExtension[];
    minSizeInMB?: number;
    maxSizeInMB?: number;
    maxFiles?: number;
}
