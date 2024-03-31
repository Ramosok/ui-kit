import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { AutoCompleteInput, AutoCompleteInputProps } from '../AutoCompleteInput';

type AutoCompleteMaskedInputWithConvertValueProps = Pick<AutoCompleteInputProps, 'placeholder' | 'disabled' | 'error'>;

export default {
    title: 'components/Form/AutoCompleteInput',
    component: AutoCompleteInput,
    args: {
        error: '',
        placeholder: 'Выберите банковскую карту',
        disabled: false,
    },
    argTypes: {
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            include: ['error', 'placeholder', 'disabled'],
        },
    },
} as Meta<AutoCompleteMaskedInputWithConvertValueProps>;

export const SyncAutoCompleteMaskedInputWithConvertValue: Story<AutoCompleteMaskedInputWithConvertValueProps> = (
    args
) => {
    const [inputValue, setInputValue] = useState<string>('');

    const mockOptions = [
        {
            value: '1234 1234 **** 1234',
            label: '1234 1234 **** 1234',
        },
        {
            value: '4567 4567 **** 4567',
            label: '4567 4567 **** 4567',
        },
        {
            value: '6789 6789 **** 6789',
            label: '6789 6789 **** 6789',
        },
    ];

    const convertCardNumber = (currentValue: string, prevValue: string): string => {
        const isOnlyNumbers = /^\d+$/.test(prevValue);
        return currentValue.length < prevValue.length && !isOnlyNumbers ? '' : currentValue;
    };

    return (
        <>
            <h1>Sync AutoCompleteMaskedInputWithConvertValue with convert value function</h1>
            <AutoCompleteInput
                {...args}
                value={inputValue}
                format="#### #### #### ####"
                mask="_"
                valueIsNumericString
                onChange={setInputValue}
                options={mockOptions}
                convertValue={(currentValue: string) => convertCardNumber(currentValue, inputValue)}
            />
        </>
    );
};

SyncAutoCompleteMaskedInputWithConvertValue.storyName = 'Sync AutoCompleteMaskedInputWithConvertValue';
