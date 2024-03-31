import React, { FocusEvent, forwardRef, ReactNode, useState, useRef } from 'react';
import DatePickerComponent, { type ReactDatePickerProps } from 'react-datepicker';
import { format } from 'date-fns';
import { CustomInput } from './components/CustomInput/CustomInput';
import { DATE_PICKER_DATE_FORMAT, DATE_PICKER_MASK_FORMAT } from './const';
import { getDatePickerOffsetOptions, getDate, getDatePickerFormattedValue } from './lib';
import { Button } from 'components/Button';
import { CustomHeader } from './components/CustomHeader/CustomHeader';
import type { Locale } from 'date-fns';
import styles from './DatePicker.module.scss';
import { useDatePickerBlurEvent } from './hooks/useDatePickerBlurEvent';
import { classNames } from 'core/helpers';

export type DatePickerLocale = Locale;

export interface DatePickerProps {
    value: string;
    locale: DatePickerLocale;
    textCanceled: ReactNode;
    textAccept: ReactNode;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    onBlur?: (e?: FocusEvent) => void;
    error?: ReactNode;
    name?: string;
    inModal?: boolean;
    otherFormat?: string;
    minDate?: ReactDatePickerProps['minDate'];
    maxDate?: ReactDatePickerProps['maxDate'];
    disabled?: boolean;
    customTrigger?: ReactNode;
    customOffset?: [number, number];
    containerClassName?: string;
    triggerClassName?: string;
    placeholder?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((componentProps, ref) => {
    const {
        error,
        value,
        inModal,
        onChange,
        onSelect,
        locale,
        onBlur,
        textCanceled,
        textAccept,
        name,
        disabled = false,
        otherFormat,
        customTrigger,
        customOffset,
        minDate,
        maxDate,
        containerClassName,
        triggerClassName,
        placeholder = 'ДД.ММ.ГГГГ',
        ...props
    } = componentProps;
    const datepickerContainerRef = useRef<HTMLDivElement>(null);
    const selectedDate = getDate(value, otherFormat);
    const [isOpenDatepicker, setIsOpenDatepicker] = useState(false);
    const [valueDate, setValueDate] = useState(selectedDate);
    const triggerRef = useRef<HTMLDivElement>(null);
    const { onFocusInput } = useDatePickerBlurEvent({
        datepickerContainerRef,
        onBlur,
    });

    const changeDate = (date: Date): void => {
        if (date) {
            onChange(format(date, DATE_PICKER_DATE_FORMAT));
        }
    };

    const handleChangeDate = (date: string): void => {
        const parsedDate = getDate(date);
        if (parsedDate) {
            changeDate(parsedDate);
            setValueDate(parsedDate);
        } else {
            onChange(date);
            setValueDate(null);
        }
    };

    const handleChangeDateInHeader = (date: Date): void => {
        setValueDate(date);
    };

    const onCancel = (): void => {
        setIsOpenDatepicker(false);
    };

    const onAccept = (): void => {
        changeDate(valueDate || new Date());
        setIsOpenDatepicker(false);
    };

    const onClickOutside = (event: React.MouseEvent<HTMLDivElement>): void => {
        const isTriggerClick = triggerRef.current?.contains?.(event.target as HTMLElement);
        if (!isTriggerClick) {
            setIsOpenDatepicker(false);
            onChange(getDatePickerFormattedValue(valueDate));
        }
    };

    const outputDate = selectedDate ? format(selectedDate, DATE_PICKER_DATE_FORMAT) : '';

    return (
        <div ref={datepickerContainerRef} className={classNames([styles.container, containerClassName])}>
            <div
                ref={triggerRef}
                className={classNames([styles.trigger, triggerClassName])}
                onClick={() => !disabled && setIsOpenDatepicker(true)}
            >
                {customTrigger || (
                    <CustomInput
                        ref={ref}
                        value={outputDate}
                        onChange={(event) => handleChangeDate(event.target.value)}
                        name={name}
                        error={error}
                        format={DATE_PICKER_MASK_FORMAT}
                        onFocus={onFocusInput}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                )}
            </div>
            {isOpenDatepicker && (
                <DatePickerComponent
                    renderCustomHeader={(customHeaderProps) => (
                        <CustomHeader
                            {...customHeaderProps}
                            formatLocale={locale}
                            onChangeDate={handleChangeDateInHeader}
                            minDate={minDate}
                            maxDate={maxDate}
                            initialValue={value}
                        />
                    )}
                    minDate={minDate}
                    maxDate={maxDate}
                    shouldCloseOnSelect={false}
                    inline
                    dateFormat={DATE_PICKER_DATE_FORMAT}
                    calendarStartDay={1}
                    selected={valueDate}
                    onChange={(date) => setValueDate(date)}
                    locale={locale.code}
                    portalId={inModal ? '' : 'root-portal'}
                    calendarClassName={styles.calendar}
                    {...props}
                    popperModifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: customOffset || (({ placement }) => getDatePickerOffsetOptions(placement)),
                            },
                        },
                    ]}
                    onClickOutside={onClickOutside}
                    onSelect={(date) => onSelect?.(getDatePickerFormattedValue(date))}
                >
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} color="white" type="button" onClick={onCancel}>
                            {textCanceled}
                        </Button>
                        <Button className={styles.button} type="button" onClick={onAccept}>
                            {textAccept}
                        </Button>
                    </div>
                </DatePickerComponent>
            )}
        </div>
    );
});
