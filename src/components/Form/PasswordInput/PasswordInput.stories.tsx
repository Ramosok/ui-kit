import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { PasswordInput, PasswordInputProps } from './PasswordInput';

export default {
    title: 'components/Form/PasswordInput',
    component: PasswordInput,
    args: {
        error: '',
    },
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
} as Meta<PasswordInputProps>;

export const PasswordInputTemplate: Story<PasswordInputProps> = (args) => <PasswordInput {...args} />;

PasswordInputTemplate.storyName = 'PasswordInput';
