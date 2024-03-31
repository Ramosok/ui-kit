import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { NumericMaskedInput, NumericMaskedInputProps } from '../MaskedInput';

type NumericMaskedInputStoryProps = Pick<
    NumericMaskedInputProps,
    'error' | 'thousandSeparator' | 'prefix' | 'suffix' | 'disabled' | 'maxLength' | 'thousandsGroupStyle'
>;

export default {
    title: 'components/Form/MaskedInput/NumericMaskedInput',
    component: NumericMaskedInput,
    args: {
        error: '',
        thousandSeparator: ' ',
        thousandsGroupStyle: 'none',
        prefix: '',
        suffix: '',
        disabled: false,
        maxLength: 10,
    },
    argTypes: {
        color: {
            options: ['thousand', 'lakh', 'wan', 'none'] as NumericMaskedInputProps['thousandsGroupStyle'][],
            control: { type: 'select' },
        },
        thousandSeparator: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            include: ['error', 'thousandSeparator', 'prefix', 'suffix', 'disabled', 'maxLength', 'thousandsGroupStyle'],
        },
    },
} as Meta<NumericMaskedInputStoryProps>;

const DEFAULT_VALUE = 1234;

export const NumericMaskedInputTemplate: Story<NumericMaskedInputStoryProps> = (args) => {
    const [value, setValue] = useState(DEFAULT_VALUE);

    return (
        <NumericMaskedInput
            {...args}
            defaultValue={DEFAULT_VALUE}
            value={value}
            onValueChange={({ value: inputValue }) => setValue(Number(inputValue))}
            type="text"
            valueIsNumericString
        />
    );
};

NumericMaskedInputTemplate.storyName = 'NumericMaskedInput';
