import type { Placement } from '@popperjs/core';
import {
    DATE_FORMATS,
    DATE_PICKER_BOTTOM_OFFSETS,
    DATE_PICKER_DATE_FORMAT,
    MAX_MONTH_ABBREVIATION_LENGTH,
    MIN_MONTH_ABBREVIATION_LENGTH,
} from './const';
import { registerLocale } from 'react-datepicker';
import { format, parse, isValid } from 'date-fns';
import type { DatePickerLocale } from './DatePicker';

interface ParseMultipleFormat {
    date: string;
    otherFormat?: string;
}

const checkIfBottomPlacement = (placement: Placement): boolean =>
    placement === 'bottom' || placement === 'bottom-end' || placement === 'bottom-start';

export const getDatePickerOffsetOptions = (placement: Placement): [number, number] => {
    if (checkIfBottomPlacement(placement)) {
        return DATE_PICKER_BOTTOM_OFFSETS;
    }

    return [0, 0];
};

export const registerDatePickerLocales = (locales: DatePickerLocale[]): void => {
    locales.forEach((locale) => {
        registerLocale(locale.code, locale);
    });
};

export const formatMonthHeader = (dateMonth: Date, formatLocale: DatePickerLocale): string => {
    return format(dateMonth, 'LLLL', { locale: formatLocale })
        .toUpperCase()
        .slice(MIN_MONTH_ABBREVIATION_LENGTH, MAX_MONTH_ABBREVIATION_LENGTH);
};

export const getDatePickerFormattedValue = (date: Date = new Date()): string => {
    try {
        return format(date, DATE_PICKER_DATE_FORMAT);
    } catch {
        return format(new Date(), DATE_PICKER_DATE_FORMAT);
    }
};

export const parseMultipleDateFormats = ({ date, otherFormat }: ParseMultipleFormat): Date | null => {
    if (otherFormat) {
        const result = parse(date, otherFormat, new Date());
        return isValid(result) ? result : null;
    }

    for (let i = 0; i < DATE_FORMATS.length; i += 1) {
        const result = parse(date, DATE_FORMATS[i], new Date());
        if (isValid(result)) {
            return result;
        }
    }

    return null;
};

export const getDate = (date: string | number | Date, otherFormat?: string): Date | null => {
    if (date) {
        return typeof date === 'string' ? parseMultipleDateFormats({ date, otherFormat }) : new Date(date);
    }
    return null;
};
