import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Spinner, type SpinnerProps } from './Spinner';

export type SpinnerStoryProps = Pick<SpinnerProps, 'color' | 'size' | 'fixed' | 'withTenge'>;

export default {
    title: 'components',
    component: Spinner,
    args: {
        color: 'main',
        size: 'lg',
        fixed: true,
        withTenge: true,
    },
    argTypes: {
        color: {
            options: ['main', 'white'],
        },
        size: {
            options: ['sm', 'md', 'lg'],
        },
    },
    parameters: {
        controls: {
            exclude: ['className'],
        },
        backgrounds: {
            default: 'black',
            values: [
                {
                    name: 'black',
                    value: '#000000',
                },
            ],
        },
    },
} as Meta<SpinnerStoryProps>;

export const SpinnerTemplate: Story<SpinnerStoryProps> = (args) => <Spinner {...args} />;

SpinnerTemplate.storyName = 'Spinner';
