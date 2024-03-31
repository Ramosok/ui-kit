import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { OtpInput, OtpInputProps } from './OtpInput';
import { Label } from 'components/Label';

type OtpInputStoryProps = Pick<OtpInputProps, 'error' | 'disabled' | 'numberOfBox'>;

export default {
    title: 'components/Form/OtpInput',
    component: OtpInput,
    args: {
        error: '',
        disabled: false,
        numberOfBox: 5,
    },
    argTypes: {
        error: {
            type: 'string',
        },
        numberOfBox: {
            control: { type: 'number', min: 2, max: 10, step: 1 },
        },
    },
    parameters: {
        controls: {
            include: ['error', 'disabled', 'numberOfBox'],
        },
    },
} as Meta<OtpInputStoryProps>;

export const OtpInputTemplate: Story<OtpInputStoryProps> = (args) => {
    const [value, setValue] = useState<string>('');
    return (
        <>
            <Label>OtpInput</Label>
            <OtpInput {...args} value={value} onChange={setValue} />
        </>
    );
};

OtpInputTemplate.storyName = 'OtpInput';
