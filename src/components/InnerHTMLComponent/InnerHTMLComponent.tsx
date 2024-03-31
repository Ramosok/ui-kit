import React, { memo } from 'react';
import type { FC, HTMLAttributes } from 'react';
import DOMPurify from 'dompurify';

export interface InnerHTMLComponentProps extends HTMLAttributes<HTMLParagraphElement> {
    html: string;
}

export const InnerHTMLComponent: FC<InnerHTMLComponentProps> = memo(
    ({ html, ...props }) => <div {...props} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />,
    (prevProps, nextProps) => prevProps.html === nextProps.html
);
