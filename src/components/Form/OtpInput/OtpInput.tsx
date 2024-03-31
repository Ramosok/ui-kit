import React, { forwardRef } from 'react';
import type { ChangeEvent, ReactNode, KeyboardEvent, FocusEvent, ClipboardEvent } from 'react';
import styles from './OtpInput.module.scss';
import { type OtpInputEvent, OtpInputKeyboardEvents } from './interface';
import { classNames } from 'core/helpers';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';
import { getPastedDataFromClipboard } from './lib';

export type OtpInputProps = {
    value: string;
    numberOfBox: number;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
    error?: ReactNode;
    otpGroupClassName?: string;
    boxClassName?: string;
    autoComplete?: string;
    reValidPattern?: RegExp;
};

const RE_VALID = /\d+/g;

export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>((componentProps, ref) => {
    const {
        value,
        numberOfBox,
        onChange,
        disabled,
        className,
        error,
        otpGroupClassName,
        boxClassName,
        autoComplete = 'one-time-code',
        reValidPattern = RE_VALID,
    } = componentProps;

    const focusToInput = (elementSibling: HTMLInputElement): void => {
        elementSibling?.focus();
    };

    const inputOnChange = (e: OtpInputEvent<ChangeEvent<HTMLInputElement>>, idx: number): void => {
        const { target } = e;
        const targetValue = target.value.trim();
        const isTargetValueValid = targetValue.match(reValidPattern)?.join('') === targetValue;

        if (!isTargetValueValid && (targetValue || target.nextElementSibling?.value)) {
            return;
        }

        onChange(`${value.substring(0, idx)}${targetValue}${value.substring(idx + 1)}`);

        if (isTargetValueValid) {
            focusToInput(target.nextElementSibling);
        }
    };

    const inputOnKeyDown = (e: OtpInputEvent<KeyboardEvent<HTMLInputElement>>): void => {
        const { key, target } = e;

        switch (key) {
            case OtpInputKeyboardEvents.ArrowRight:
            case OtpInputKeyboardEvents.ArrowDown:
            case target.value:
                e.preventDefault();
                focusToInput(target.nextElementSibling);
                break;
            case OtpInputKeyboardEvents.ArrowLeft:
            case OtpInputKeyboardEvents.ArrowUp:
                e.preventDefault();
                focusToInput(target.previousElementSibling);
                break;
            default:
                target.setSelectionRange(0, target.value.length);

                if (key !== OtpInputKeyboardEvents.Backspace || target.value) {
                    break;
                }
                focusToInput(target.previousElementSibling);
        }
    };

    const inputOnFocus = (e: OtpInputEvent<FocusEvent<HTMLInputElement>>): void => {
        const prevInputEl = e.target.previousElementSibling;

        if (!prevInputEl?.value) {
            focusToInput(prevInputEl);
        }
    };

    const handlePaste = (e: OtpInputEvent<ClipboardEvent<HTMLInputElement>>): void => {
        e.preventDefault();
        const pastedData = getPastedDataFromClipboard(e, reValidPattern, numberOfBox);
        if (pastedData) {
            onChange(pastedData);
            setTimeout(() => {
                const lastInputElement = e.target.parentNode.children?.[pastedData.length - 1];
                focusToInput((lastInputElement?.nextElementSibling || lastInputElement) as HTMLInputElement);
            }, 0);
        }
    };

    return (
        <div
            className={classNames({
                [styles.container]: true,
                [className]: !!className,
            })}
        >
            <div
                className={classNames({
                    [styles.otpInputGroup]: true,
                    [otpGroupClassName]: !!otpGroupClassName,
                })}
                ref={ref}
            >
                {Array.from({ length: numberOfBox }, (_, idx) => (
                    <input
                        className={classNames({
                            [styles.input]: true,
                            [styles.inputError]: !!error,
                            [styles.inputDisabled]: !!disabled,
                            [boxClassName]: !!boxClassName,
                        })}
                        key={`otp_${idx}`}
                        type="text"
                        inputMode="text"
                        autoComplete={autoComplete}
                        pattern="\d{1}"
                        disabled={disabled}
                        value={value[idx] || ''}
                        onChange={(e: OtpInputEvent<KeyboardEvent<HTMLInputElement>>) => inputOnChange(e, idx)}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                        onPaste={handlePaste}
                    />
                ))}
            </div>
            {error && <FormFieldErrorMessage className={styles.errorLabel}>{error}</FormFieldErrorMessage>}
        </div>
    );
});
