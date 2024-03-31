import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { classNames } from '../../core/helpers';
import { InnerHTMLComponent } from '../InnerHTMLComponent';
import styles from './FormErrorInnerHTML.module.scss';

export interface FormErrorInnerHTMLProps extends HTMLAttributes<HTMLParagraphElement> {
    content: string;
}

export const FormErrorInnerHTML: FC<FormErrorInnerHTMLProps> = ({ content, className, ...props }) => (
    <InnerHTMLComponent {...props} className={classNames([styles.errorWrapper, className])} html={content} />
);
