import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Button, type ButtonProps } from './Button';
import type { ButtonColor } from './interface';

export type ButtonStoryProps = Pick<ButtonProps, 'color' | 'title' | 'disabled'>;

export default {
    title: 'components',
    component: Button,
    args: {
        title: 'Click Me!',
        color: 'primary',
        disabled: false,
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'light', 'white'] as ButtonColor[],
            control: { type: 'select' },
        },
    },
    parameters: {
        controls: {
            exclude: ['prefixIcon', 'postfixIcon'],
        },
    },
} as Meta<ButtonStoryProps>;

export const ButtonTemplate: Story<ButtonStoryProps> = ({ title, ...args }) => <Button {...args}>{title}</Button>;

ButtonTemplate.storyName = 'Button';
