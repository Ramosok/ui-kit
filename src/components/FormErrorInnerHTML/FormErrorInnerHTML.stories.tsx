import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { FormErrorInnerHTML, FormErrorInnerHTMLProps } from './FormErrorInnerHTML';

export default {
    title: 'components',
    component: FormErrorInnerHTML,
    args: {
        content: '<p>This is the error <a href="https://www.google.com/" target="_blank">content</a></p>',
    },
} as Meta<FormErrorInnerHTMLProps>;

export const FormErrorInnerHTMLTemplate: Story<FormErrorInnerHTMLProps> = (args) => <FormErrorInnerHTML {...args} />;

FormErrorInnerHTMLTemplate.storyName = 'FormErrorInnerHTML';
