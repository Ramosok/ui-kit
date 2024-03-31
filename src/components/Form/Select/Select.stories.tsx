import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from './Select';

const MOCKED_STATE = [
    {
        value: 'value',
        label: 'label',
    },
    {
        value: 'value1',
        label: 'label1',
    },
    {
        value: 'value2',
        label: 'label2',
    },
];

export default {
    title: 'components/Form/Select',
    component: Select,
    args: {
        error: '',
        options: MOCKED_STATE,
        disabled: false,
        placeholder: 'placeholder',
    },
    argTypes: {
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            exclude: ['options'],
        },
    },
} as Meta<SelectProps>;

export const SelectTemplate: Story<SelectProps> = (args) => {
    const [value, setValue] = useState<string>('');

    return <Select {...args} value={value} onChange={(event) => setValue(event.target.value)} />;
};

SelectTemplate.storyName = 'Select';
