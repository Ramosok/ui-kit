import React, { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import { Input, type InputProps } from 'components/Form/Input';
import { SearchIcon } from 'components/Icons';
import styles from './SearchInput.module.scss';
import { classNames } from 'core/helpers';
import { Spinner } from 'components/Spinner';

export interface SearchInputProps extends Partial<InputProps> {
    onValueChange: (value: string) => void;
    placeholder: string;
    isLoading?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((componentProps, ref) => {
    const { onValueChange, placeholder, className, inputValueClassName, isLoading = false, ...props } = componentProps;

    const onChange = (event: ChangeEvent): void => {
        const value = (event.target as HTMLInputElement)?.value || '';
        onValueChange(value);
    };

    const onKeyDown = (event: KeyboardEvent): void => {
        event.stopPropagation();
    };

    return (
        <div className={styles.container}>
            <Input
                ref={ref}
                type="text"
                className={classNames({
                    [styles.searchInput]: true,
                    [className]: !!className,
                })}
                inputValueClassName={classNames({
                    [styles.input]: true,
                    [inputValueClassName]: !!inputValueClassName,
                })}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                {...props}
            />
            {isLoading ? (
                <Spinner size="sm" className={styles.loaderContainer} loaderClassName={styles.loader} />
            ) : (
                <SearchIcon className={styles.icon} />
            )}
        </div>
    );
});
