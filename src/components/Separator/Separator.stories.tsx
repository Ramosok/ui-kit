import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { SeparatorColor } from './inteface';
import { Separator, SeparatorProps } from './Separator';

type SeparatorStoryProps = Pick<SeparatorProps, 'color'>;

export default {
    title: 'components/Separator',
    component: Separator,
    args: {
        color: 'secondary',
    },
    argTypes: {
        color: {
            options: ['secondary', 'primary'] as SeparatorColor[],
            control: 'select',
        },
    },
    parameters: {
        controls: {
            exclude: ['className'],
        },
    },
} as Meta<SeparatorStoryProps>;

export const SeparatorTemplate: Story<SeparatorStoryProps> = (args) => <Separator {...args} />;

SeparatorTemplate.storyName = 'Separator';
