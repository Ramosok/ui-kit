import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { PatternMaskedInput, PatternMaskedInputProps } from '../MaskedInput';

type PatternMaskedInputStoryProps = Pick<
    PatternMaskedInputProps,
    'error' | 'disabled' | 'mask' | 'allowEmptyFormatting'
>;

const DEFAULT_FORMAT = '+8 (###) ###-##-##';
const DEFAULT_VALUE = '84445556677';

export default {
    title: 'components/Form/MaskedInput/PatternMaskedInput',
    component: PatternMaskedInput,
    args: {
        error: '',
        disabled: false,
        mask: '_',
        allowEmptyFormatting: true,
    },
    argTypes: {
        mask: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            include: ['error', 'disabled', 'mask', 'allowEmptyFormatting'],
        },
    },
} as Meta<PatternMaskedInputStoryProps>;

export const PatternMaskedInputTemplate: Story<PatternMaskedInputStoryProps> = (args) => {
    const [value, setValue] = useState(DEFAULT_VALUE);

    return (
        <PatternMaskedInput
            {...args}
            defaultValue={value}
            changeValue={(newValue) => setValue(newValue)}
            type="tel"
            format={DEFAULT_FORMAT}
        />
    );
};

PatternMaskedInputTemplate.storyName = 'PatternMaskedInput';
