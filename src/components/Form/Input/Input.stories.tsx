import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Input, InputProps } from './Input';
import type { InputType } from 'components/Form/Input/interface';
import { Label } from 'components/Label';

type InputStoryProps = Pick<InputProps, 'error' | 'underline' | 'type'>;

export default {
    title: 'components/Form/Input',
    component: Input,
    args: {
        error: '',
        underline: false,
        type: 'text',
    },
    argTypes: {
        type: {
            options: ['text', 'number', 'password'] as InputType[],
            control: 'radio',
        },
        error: {
            type: 'string',
        },
    },
    parameters: {
        controls: {
            exclude: ['inputValueClassName, errorInputContainer'],
        },
    },
} as Meta<InputStoryProps>;

export const InputTemplate: Story<InputStoryProps> = (args) => (
    <>
        <Label>Input</Label>
        <Input {...args} />
    </>
);

InputTemplate.storyName = 'Input';
