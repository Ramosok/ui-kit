import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { getDatePickerFormattedValue, registerDatePickerLocales } from './lib';
import { DatePicker, DatePickerProps } from './DatePicker';
import * as locales from 'date-fns/locale';
import { ButtonLink } from '../../Links';

type DateFnsLocales = typeof locales;

type DatePickerStoryProps = Pick<DatePickerProps, 'error' | 'textCanceled' | 'textAccept' | 'value'> & {
    localeString: keyof DateFnsLocales;
};

registerDatePickerLocales(Object.values(locales));

export default {
    title: 'components/Form/DatePicker',
    component: DatePicker,
    args: {
        error: '',
        localeString: 'ru',
        textCanceled: 'ОТМЕНИТЬ',
        textAccept: 'ПРИМЕНИТЬ',
        value: '',
        otherFormat: '',
        placeholder: '',
        disabled: false,
    },
    argTypes: {
        localeString: {
            control: 'select',
            options: Object.keys(locales),
        },
        error: { control: { type: 'text' } },
        value: { control: { type: 'text' } },
        otherFormat: { control: { type: 'text' } },
    },
    parameters: {
        controls: {
            exclude: [
                'inModal',
                'onChange',
                'handleBlur',
                'locale',
                'name',
                'onBlur',
                'customTrigger',
                'customOffset',
                'containerClassName',
                'triggerClassName',
            ],
        },
    },
} as Meta<DatePickerStoryProps>;

export const DatePickerTemplate: Story<DatePickerStoryProps> = ({ localeString, value, ...args }) => {
    const [valueDate, setValueDate] = useState<string>(value || getDatePickerFormattedValue(new Date()));
    const locale = locales[localeString];

    return (
        <DatePicker
            {...args}
            locale={locale}
            value={valueDate}
            onChange={setValueDate}
            minDate={new Date('2023/06/08')}
            maxDate={new Date('2024/07/25')}
        />
    );
};

export const DatePickerWithCustomTrigger: Story<DatePickerStoryProps> = ({ localeString, value, ...args }) => {
    const [valueDate, setValueDate] = useState<string>(value || getDatePickerFormattedValue(new Date()));
    const locale = locales[localeString];

    return (
        <DatePicker
            {...args}
            locale={locale}
            value={valueDate}
            onChange={setValueDate}
            customTrigger={<ButtonLink>Open Date Picker</ButtonLink>}
            minDate={new Date('2023/06/08')}
            maxDate={new Date('2023/07/25')}
        />
    );
};

DatePickerTemplate.storyName = 'DatePicker';
DatePickerWithCustomTrigger.storyName = 'DatePicker with customTrigger';
