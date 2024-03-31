import React, { type ChangeEvent, type FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { OptionsList } from './components/OptionsList/OptionsList';
import { classNames } from 'core/helpers';
import { Input, InputProps } from 'components/Form/Input';
import styles from './AutoCompleteInput.module.scss';
import debounce from 'debounce';
import { PatternMaskedInput, PatternMaskedInputProps } from 'components/Form/MaskedInput';
import { type SearchOption, type UseOptionsSearchInput, type OptionsFilter, useOptionsSearch } from 'core/hooks';
import { useCloseAutoCompleteOnClickOutside } from './hooks/useCloseAutoCompleteOnClickOutside';

export interface CommonAutoCompleteProps {
    value: string;
    options: SearchOption[];
    onChange: (value: string) => void;
    className?: string;
    debounceTimeout?: number;
    onAsyncSearch?: (value: string) => Promise<void>;
    onInitialSearch?: () => Promise<void>;
    optionsFilter?: OptionsFilter;
    searchBy?: UseOptionsSearchInput['searchBy'];
    attributeKey?: string;
    convertValue?: (value: string) => string;
    optionsListClassName?: string;
    optionClassName?: string;
}
export type AutoCompletePatternMaskedInput = Omit<PatternMaskedInputProps, 'changeValue' | 'type'> &
    CommonAutoCompleteProps;
export type AutoCompleteDefaultInput = Omit<InputProps, 'onChange' | 'type'> & CommonAutoCompleteProps;
export type AutoCompleteInputProps = AutoCompletePatternMaskedInput | AutoCompleteDefaultInput;

export const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>((componentProps, ref) => {
    const {
        value,
        options,
        onChange,
        className,
        debounceTimeout = 300,
        onAsyncSearch,
        optionsFilter,
        onInitialSearch,
        searchBy = 'value',
        attributeKey,
        onBlur,
        convertValue,
        optionsListClassName,
        optionClassName,
        ...props
    } = componentProps;
    const isPatternMasked = 'format' in props;

    const autoCompleteInputRef = useRef<HTMLInputElement>(null);
    const contentOpenedCountRef = useRef<number>(0);
    const optionsListRef = useRef<HTMLDivElement>();
    const blurEvent = useRef<FocusEvent<HTMLInputElement>>(null);
    const [searchValue, setSearchValue] = useState<string>(value || '');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const debounceSearchValueRef = useRef<(debounceSearchValue: string) => void>(
        debounceTimeout &&
            debounce((debounceSearchValue: string) => {
                if (onAsyncSearch) {
                    onAsyncSearch(debounceSearchValue);
                } else {
                    setSearchValue(debounceSearchValue);
                }
                optionsListRef.current?.scrollTo(0, 0);
            }, debounceTimeout)
    );
    useCloseAutoCompleteOnClickOutside({ ref: autoCompleteInputRef, attributeKey, setIsOpen });
    const { options: finalOptions } = useOptionsSearch({
        asyncSearch: !!onAsyncSearch,
        searchValue,
        optionsFilter,
        options,
        searchBy,
    });
    const isShowCardOptions = isOpen && !!finalOptions?.length;

    const changeInputValue = (newValue: string): void => {
        const convertedValue = convertValue?.(newValue) ?? newValue;
        if (debounceSearchValueRef.current) {
            debounceSearchValueRef.current(convertedValue);
        } else {
            setSearchValue(convertedValue);
        }
        onChange(convertedValue);
    };

    const selectOptionValue = (selectedValue: SearchOption): void => {
        const { value: newValue } = selectedValue;
        setSearchValue(newValue);
        onChange(newValue);
        setIsOpen(false);
    };

    const handleFocusInput = (): void => {
        if (contentOpenedCountRef.current === 0) {
            contentOpenedCountRef.current = 1;
            onAsyncSearch?.(searchValue);
            onInitialSearch?.();
        }
        setIsOpen(true);
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
        blurEvent.current = event;
    };

    useEffect(() => {
        if (!isOpen && contentOpenedCountRef.current === 1 && blurEvent.current) {
            onBlur?.(blurEvent.current);
        }
    }, [isOpen]);

    return (
        <div
            className={classNames({
                [styles.container]: true,
                [className]: !!className,
            })}
            ref={ref}
        >
            {isPatternMasked && (
                <PatternMaskedInput
                    {...props}
                    value={value}
                    type="text"
                    changeValue={(newValue) => changeInputValue(newValue)}
                    ref={autoCompleteInputRef}
                    onBlur={handleInputBlur}
                    onFocus={handleFocusInput}
                    autoComplete="off"
                />
            )}
            {!isPatternMasked && (
                <Input
                    {...props}
                    value={value}
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeInputValue(e.target.value)}
                    ref={autoCompleteInputRef}
                    onBlur={handleInputBlur}
                    onFocus={handleFocusInput}
                    autoComplete="off"
                />
            )}
            <OptionsList
                ref={optionsListRef}
                options={finalOptions}
                onSelect={selectOptionValue}
                isOpen={isShowCardOptions}
                listClassName={optionsListClassName}
                optionClassName={optionClassName}
            />
        </div>
    );
});
