import React, { useState, type InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Input } from '../Input';
import { EyeIcon, EyeCrossedIcon } from 'components/Icons';
import styles from './PasswordInput.module.scss';
import type { PasswordInputType } from './interface';

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: PasswordInputType;
    error?: string | ReactNode;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((componentProps, ref) => {
    const { type, ...props } = componentProps;
    const [inputType, setInputType] = useState<'text' | 'password'>(type);

    return (
        <div className={styles.container}>
            <Input type={inputType} {...props} ref={ref} />
            <div
                className={styles.iconContainer}
                onClick={() => setInputType(inputType === 'text' ? 'password' : 'text')}
            >
                {inputType === 'text' && <EyeCrossedIcon />}
                {inputType !== 'text' && <EyeIcon />}
            </div>
        </div>
    );
});
