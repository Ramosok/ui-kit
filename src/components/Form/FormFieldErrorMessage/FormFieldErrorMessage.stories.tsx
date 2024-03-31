import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { FormFieldErrorMessage, FormFieldErrorMessageProps } from './FormFieldErrorMessage';

type FormFieldErrorMessageStoryProps = Pick<FormFieldErrorMessageProps, 'children' | 'withInfoIcon'>;

export default {
    title: 'components/Form/FormFieldErrorMessage',
    component: FormFieldErrorMessage,
    args: {
        children: 'Error Message',
        withInfoIcon: true,
    },
    parameters: {
        controls: {
            exclude: ['className'],
        },
    },
} as Meta<FormFieldErrorMessageStoryProps>;

export const FormFieldErrorMessageTemplate: Story<FormFieldErrorMessageStoryProps> = ({ children, ...args }) => (
    <FormFieldErrorMessage {...args}>{children}</FormFieldErrorMessage>
);

FormFieldErrorMessageTemplate.storyName = 'FormFieldErrorMessage';
