import React, {
    type InputHTMLAttributes,
    forwardRef,
    ReactNode,
    useState,
    FocusEvent,
    ChangeEvent,
    useRef,
    useEffect,
} from 'react';
import { classNames } from 'core/helpers';
import styles from './Select.module.scss';
import { DropsIcon } from 'components/Icons';
import type { SelectOption } from './interface';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';

const KEY_ESC = 27;

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    error?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((componentProps, ref) => {
    const { value, options, className, disabled, error, placeholder, onBlur, onChange, ...props } = componentProps;
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>();
    const defaultValue = componentProps?.defaultValue?.toString();

    const [innerValue, setInnerValue] = useState<string>(defaultValue);
    const isPlaceholderSelected = ref ? !!placeholder && !innerValue : !!placeholder && !value;

    const handleOpen = (): void => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleCloseBlur = (event: FocusEvent<HTMLSelectElement>): void => {
        setIsOpen(false);

        if (onBlur) {
            onBlur(event);
        }
    };

    const handleCloseKeyUp = (e: { keyCode: number }): void => {
        if (e.keyCode === KEY_ESC) {
            setIsOpen(false);
        }
    };

    const onChangeSelectValue = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (ref) {
            setInnerValue(event.target.value);
        }
        onChange?.(event);
    };

    useEffect(() => {
        if (ref && !innerValue) {
            const selectElement = containerRef.current?.firstElementChild as HTMLSelectElement;
            if (selectElement?.value) {
                setInnerValue(selectElement.value);
            }
        }
    }, [options.length]);

    return (
        <div className={styles.inputContainer} ref={containerRef}>
            <select
                value={value}
                onClick={handleOpen}
                onChange={onChangeSelectValue}
                onBlur={handleCloseBlur}
                onKeyUp={handleCloseKeyUp}
                disabled={disabled}
                className={classNames({
                    [styles.select]: true,
                    [styles.inputError]: !!error,
                    [styles.disabled]: disabled,
                    [styles.placeholder]: isPlaceholderSelected,
                    [className]: !!className,
                })}
                {...props}
                ref={ref}
            >
                {placeholder && (
                    <option key="initial_value" disabled className={styles.optionPlaceholder} value="">
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option className={styles.option} key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <DropsIcon
                className={classNames({
                    [styles.selectIcon]: true,
                    [styles.opened]: isOpen,
                    [styles.disabled]: disabled,
                })}
            />
            {error && <FormFieldErrorMessage className={styles.errorLabel}>{error}</FormFieldErrorMessage>}
        </div>
    );
});
