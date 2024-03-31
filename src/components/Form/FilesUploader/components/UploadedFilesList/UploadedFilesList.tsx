import React from 'react';
import type { FC } from 'react';
import { classNames } from 'core/helpers';
import styles from './UploadedFilesList.module.scss';
import { UploadedFileItem } from '../UploadedFileItem/UploadedFileItem';
import type { FilesUploaderFile } from '../../interface';

export interface UploadedFilesListProps {
    files: FilesUploaderFile[];
    fileListClassName?: string;
    removeFromList: (fileId: FilesUploaderFile['id']) => void;
    showUploadedFileSize?: boolean;
}

export const UploadedFilesList: FC<UploadedFilesListProps> = ({
    files,
    fileListClassName,
    removeFromList,
    showUploadedFileSize,
}) => {
    return (
        <div className={classNames([styles.fileList, fileListClassName])}>
            {!!files.length &&
                files.map((file) => (
                    <UploadedFileItem
                        key={file.id}
                        name={file.originalFile.name}
                        size={file.originalFile.size}
                        onDelete={() => removeFromList(file.id)}
                        showUploadedFileSize={showUploadedFileSize}
                    />
                ))}
        </div>
    );
};
