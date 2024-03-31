import React, { type TextareaHTMLAttributes, forwardRef, ReactNode } from 'react';
import { classNames } from 'core/helpers';
import styles from '../Input/Input.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string | ReactNode;
    placeholder?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((componentProps, ref) => {
    const { disabled, error, className = '', placeholder = '', ...props } = componentProps;

    return (
        <div className={styles.inputContainer}>
            <textarea
                {...props}
                ref={ref}
                disabled={disabled}
                className={classNames({
                    [styles.input]: true,
                    [styles.inputError]: !!error,
                    [styles.disabled]: disabled,
                    [className]: !!className,
                })}
                placeholder={placeholder}
            />
            {error && <span className={styles.errorLabel}>{error}</span>}
        </div>
    );
});
