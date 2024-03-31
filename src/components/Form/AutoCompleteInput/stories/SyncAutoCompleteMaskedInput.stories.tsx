import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { AutoCompleteInput, AutoCompleteInputProps } from '../AutoCompleteInput';

type AutoCompleteMaskedInput = Pick<AutoCompleteInputProps, 'placeholder' | 'disabled' | 'error'>;

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
} as Meta<AutoCompleteMaskedInput>;

export const SyncAutoCompleteMaskedInput: Story<AutoCompleteMaskedInput> = (args) => {
    const [inputValue, setInputValue] = useState<string>('');

    const mockOptions = [
        {
            value: '1234123412341234',
            label: '1234 1234 **** 1234',
        },
        {
            value: '4567456745674567',
            label: '4567 4567 **** 4567',
        },
        {
            value: '6789678967896789',
            label: '6789 6789 **** 6789',
        },
    ];

    return (
        <>
            <h1>Sync AutoCompleteInput with format</h1>
            <AutoCompleteInput
                {...args}
                value={inputValue}
                format="#### #### #### ####"
                mask="_"
                valueIsNumericString
                onChange={setInputValue}
                options={mockOptions}
            />
        </>
    );
};

SyncAutoCompleteMaskedInput.storyName = 'Sync AutoCompleteMaskedInput';
