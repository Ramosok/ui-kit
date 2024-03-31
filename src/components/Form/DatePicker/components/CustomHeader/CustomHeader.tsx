import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { DoubleArrowIcon, ArrowIcon } from 'components/Icons';
import { formatMonthHeader, getDate } from '../../lib';
import styles from './CustomHeader.module.scss';
import type { DatePickerLocale, DatePickerProps } from '../../DatePicker';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { isWithinInterval } from 'date-fns';

interface CustomHeaderProps extends ReactDatePickerCustomHeaderProps {
    formatLocale: DatePickerLocale;
    onChangeDate: (date: Date) => void;
    minDate: DatePickerProps['minDate'];
    maxDate: DatePickerProps['maxDate'];
    initialValue: DatePickerProps['value'];
}

export const CustomHeader: FC<CustomHeaderProps> = ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    formatLocale,
    onChangeDate,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
    minDate,
    maxDate,
    initialValue,
    changeMonth,
    changeYear,
}) => {
    const monthLabel = formatMonthHeader(date, formatLocale);
    const dateString = `${monthLabel} ${date.getFullYear()}`;
    const isInitialValueSetRef = useRef<boolean>(false);

    useEffect(() => {
        if (initialValue && !isInitialValueSetRef.current) {
            isInitialValueSetRef.current = true;
            const initialDate = getDate(initialValue);
            if (initialDate) {
                changeMonth(initialDate.getMonth());
                changeYear(initialDate.getFullYear());
            }
        }
    }, [initialValue]);

    useEffect(() => {
        try {
            const isDateValid = isWithinInterval(date, {
                start: minDate,
                end: maxDate,
            });
            if (date && isDateValid) {
                onChangeDate(date);
            }
        } catch {
            onChangeDate(date);
        }
    }, [date]);

    return (
        <div className={styles.customHeaderContainer}>
            <button
                type="button"
                className={styles.arrowButton}
                onClick={decreaseYear}
                disabled={prevYearButtonDisabled}
            >
                <DoubleArrowIcon className={styles.doubleArrowLeft} />
            </button>
            <div className={styles.centerContainer}>
                <button
                    type="button"
                    className={styles.arrowButton}
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                >
                    <ArrowIcon className={styles.arrowLeft} />
                </button>
                <div className={styles.dateBlock}>{dateString}</div>
                <button
                    type="button"
                    className={styles.arrowButton}
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                >
                    <ArrowIcon className={styles.arrowRight} />
                </button>
            </div>
            <button
                type="button"
                className={styles.arrowButton}
                onClick={increaseYear}
                disabled={nextYearButtonDisabled}
            >
                <DoubleArrowIcon className={styles.doubleArrowRight} />
            </button>
        </div>
    );
};
