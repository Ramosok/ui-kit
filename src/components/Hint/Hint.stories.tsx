import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Hint, HintProps, HintType } from './Hint.component';

type HintStoryProps = Pick<HintProps, 'title' | 'type'>;

export default {
    title: 'components',
    component: Hint,
    args: {
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        type: 'default',
    },
    argTypes: {
        title: {
            control: { type: 'text' },
        },
        color: {
            options: ['default', 'error'] as HintType[],
            control: { type: 'select' },
        },
    },
    parameters: {
        controls: {
            include: ['title', 'type'],
        },
    },
} as Meta<HintStoryProps>;

export const HintTemplate: Story<HintStoryProps> = (args) => <Hint {...args} />;

HintTemplate.storyName = 'Hint';
