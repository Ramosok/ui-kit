import React, { useRef, useState, ReactNode, useEffect, forwardRef } from 'react';
import styles from './SearchSelect.module.scss';
import { classNames } from 'core/helpers';
import { OptionsList, TriggerContent, SearchInput } from './components';
import { type OptionsFilter, type SearchOption, useOptionsSearch, useCloseOnClickOutside } from 'core/hooks';
import debounce from 'debounce';
import type { InputProps } from '../Input';
import { Spinner } from 'components/Spinner';
import { useSearchSelectContentWidth, useSelectContentOpening } from './hooks';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';

export interface SearchSelectProps {
    selectedValue: string | null;
    onSelect: (option: string) => void;
    options: SearchOption[];
    placeholder?: string;
    error?: ReactNode;
    searchInputPlaceholder?: string;
    focusSearchInput?: boolean;
    onAsyncSearch?: (value: string) => Promise<void>;
    debounceTimeout?: number;
    asyncSearch?: boolean;
    optionsFilter?: OptionsFilter;
    onOpen?: (data: { isOpened?: boolean; firstTimeOpened?: boolean }) => void;
    children?: ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    isInitialLoading?: boolean;
    noOptionsText?: JSX.Element | string;
    searchInputProps?: Partial<InputProps>;
    containerClassName?: string;
    triggerContainerClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
    optionsListClassName?: string;
    optionClassName?: string;
}

export const SearchSelect = forwardRef<HTMLDivElement, SearchSelectProps>((componentProps, ref) => {
    const {
        selectedValue,
        onSelect,
        options,
        placeholder,
        error,
        focusSearchInput = true,
        searchInputPlaceholder,
        onAsyncSearch,
        debounceTimeout = 300,
        asyncSearch = false,
        optionsFilter,
        onOpen,
        children,
        disabled = false,
        noOptionsText,
        isLoading,
        isInitialLoading,
        containerClassName,
        triggerContainerClassName,
        triggerClassName,
        contentClassName,
        optionClassName,
        optionsListClassName,
        searchInputProps = {},
    } = componentProps;

    const [searchValue, setSearchValue] = useState<string>('');
    const [defaultSearchValue, setDefaultSearchValue] = useState<string>('');
    const [isContentOpened, setIsContentOpened] = useState<boolean>();
    const [selectedOption, setSelectedOption] = useState<SearchOption>();

    const containerRef = useRef<HTMLDivElement>(null);
    const optionsListRef = useRef<HTMLDivElement>();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const debounceSearchValueRef = useRef<(value: string) => void>(
        debounceTimeout &&
            debounce((value: string) => {
                if (asyncSearch) {
                    onAsyncSearch(value);
                } else {
                    setSearchValue(value);
                }
                setDefaultSearchValue(value);
                optionsListRef.current?.scrollTo(0, 0);
            }, debounceTimeout)
    );

    const { onOpenChange } = useSelectContentOpening({
        onOpen,
        focusSearchInput,
        searchInputRef,
    });
    const { triggerWidth } = useSearchSelectContentWidth({
        triggerRef,
        isContentOpened,
    });
    const { options: finalOptions } = useOptionsSearch({
        asyncSearch,
        searchValue,
        optionsFilter,
        options,
    });
    useCloseOnClickOutside({
        ref: containerRef,
        isOpen: isContentOpened,
        setIsOpen: setIsContentOpened,
    });

    useEffect(() => {
        if (selectedValue !== selectedOption?.value) {
            setSelectedOption(options.find((option: SearchOption) => option.value === selectedValue));
        }
    }, [selectedValue, selectedOption, options]);

    useEffect(() => {
        if (disabled) {
            setIsContentOpened(false);
        }
    }, [disabled]);

    const onChangeSearchValue = (value: string): void => {
        const convertedValues = (value || '').trim();
        if (debounceSearchValueRef.current) {
            debounceSearchValueRef.current(convertedValues);
        } else {
            setSearchValue(convertedValues);
        }
    };

    const onSelectOption = (option: SearchOption): void => {
        setSelectedOption(option);
        onSelect(option.value);
        setSearchValue('');
        setDefaultSearchValue('');
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
        setIsContentOpened(false);
    };

    const onToggleContent = (): void => {
        setIsContentOpened((prevIsOpen) => {
            const updatedValue = !prevIsOpen;
            onOpenChange(updatedValue);
            return updatedValue;
        });
    };

    const isNoOptions = finalOptions.length === 0 && !isLoading && !isInitialLoading;

    return (
        <div ref={containerRef} className={classNames([styles.container, containerClassName])}>
            <div ref={ref} role="searchbox" tabIndex={0} className={classNames([triggerContainerClassName])}>
                <button
                    ref={triggerRef}
                    type="button"
                    disabled={disabled}
                    onClick={onToggleContent}
                    className={classNames({
                        [styles.trigger]: true,
                        [styles.focused]: isContentOpened,
                        [styles.inputError]: !!error,
                        [triggerClassName]: !!triggerClassName,
                    })}
                >
                    <TriggerContent
                        selectedOption={selectedOption}
                        disabled={disabled}
                        isContentOpened={isContentOpened}
                        placeholder={placeholder}
                    />
                </button>
                {error && <FormFieldErrorMessage className={styles.errorLabel}>{error}</FormFieldErrorMessage>}
            </div>
            <div
                className={classNames({
                    [styles.content]: true,
                    [contentClassName]: !!contentClassName,
                    [styles.opened]: isContentOpened,
                })}
                style={{ width: triggerWidth || 'initial' }}
            >
                <div
                    className={classNames({
                        [styles.contentWrapper]: true,
                        [styles.opened]: isContentOpened,
                    })}
                >
                    <SearchInput
                        {...searchInputProps}
                        ref={searchInputRef}
                        onValueChange={onChangeSearchValue}
                        placeholder={searchInputPlaceholder}
                        isLoading={isLoading}
                        defaultValue={defaultSearchValue}
                    />
                    {isInitialLoading ? (
                        <div className={styles.spinnerContainer}>
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <>
                            {isNoOptions ? (
                                <div className={styles.noOptionsContainer}>
                                    <span className={styles.noOptionsText}>{noOptionsText}</span>
                                </div>
                            ) : (
                                <OptionsList
                                    ref={optionsListRef}
                                    options={finalOptions}
                                    selectedValue={selectedValue}
                                    onSelect={onSelectOption}
                                    listClassName={optionsListClassName}
                                    optionClassName={optionClassName}
                                />
                            )}
                            {children}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});
