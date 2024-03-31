import React, { LabelHTMLAttributes } from 'react';
import { Label } from './Label';
import type { Story, Meta } from '@storybook/react';

type LabelStoryProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'children'>;

export default {
    title: 'components',
    component: Label,
    args: {
        children: 'You text',
    },
} as Meta<LabelStoryProps>;

export const LabelTemplate: Story<LabelStoryProps> = ({ children, ...args }) => <Label {...args}>{children}</Label>;

LabelTemplate.storyName = 'Label';
