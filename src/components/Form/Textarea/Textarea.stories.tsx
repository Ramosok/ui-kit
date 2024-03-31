import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Textarea, TextareaProps } from './Textarea';

type TextareaStoryProps = Pick<TextareaProps, 'error' | 'placeholder'>;

export default {
    title: 'components/Form/Textarea',
    component: Textarea,
    args: {
        error: '',
        placeholder: 'Type something...',
    },
} as Meta<TextareaStoryProps>;

export const TextareaTemplate: Story<TextareaStoryProps> = (args) => <Textarea {...args} />;

TextareaTemplate.storyName = 'Textarea';
