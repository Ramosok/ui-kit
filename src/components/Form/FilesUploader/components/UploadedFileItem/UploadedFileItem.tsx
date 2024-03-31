import React, { type FC } from 'react';
import styles from './UploadedFileItem.module.scss';
import { DeleteIcon, FileIcon } from 'components/Icons';
import { convertBytesInMegabytes } from 'core/helpers';

export interface UploadedFileItemProps {
    name?: string;
    size?: number;
    onDelete?: () => void;
    showUploadedFileSize?: boolean;
}

export const UploadedFileItem: FC<UploadedFileItemProps> = ({ name, size, onDelete, showUploadedFileSize }) => {
    return (
        <div className={styles.filesItem}>
            <FileIcon className={styles.fileIcon} />
            <div className={styles.file}>
                <span className={styles.name}>{name}</span>
                <div className={styles.underline} />
                {showUploadedFileSize && size && (
                    <span className={styles.size}>{`${convertBytesInMegabytes(size)} Mb`}</span>
                )}
            </div>
            <DeleteIcon className={styles.fileDelete} onClick={onDelete} />
        </div>
    );
};
