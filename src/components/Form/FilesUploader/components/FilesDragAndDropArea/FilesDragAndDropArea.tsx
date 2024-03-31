import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import styles from './FilesDragAndDropArea.module.scss';
import { classNames } from 'core/helpers';
import { DragAndDropIcon } from 'components/Icons';

export interface FilesDragAndDropAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onDragOver'> {
    isDragActive: boolean;
}

export const FilesDragAndDropArea = forwardRef<HTMLDivElement, FilesDragAndDropAreaProps>((componentProps, ref) => {
    const { isDragActive, children, className, ...props } = componentProps;

    return (
        <div {...props} ref={ref} className={classNames([styles.container, className])}>
            <div
                className={classNames({
                    [styles.dragOverContainer]: true,
                    [styles.open]: isDragActive,
                })}
            >
                <div className={styles.dragOverCircle}>
                    <DragAndDropIcon className={styles.dragOverIcon} />
                </div>
            </div>
            {children}
        </div>
    );
});
