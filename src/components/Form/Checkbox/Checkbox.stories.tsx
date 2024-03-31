import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
    title: 'components/Form/Checkbox',
    component: Checkbox,
    args: {
        children: 'label',
        disabled: false,
        defaultChecked: false,
    },
    parameters: {
        controls: {
            exclude: ['onCheckedChange'],
        },
    },
} as Meta<CheckboxStoryProps>;

type CheckboxStoryProps = Pick<CheckboxProps, 'children' | 'disabled' | 'defaultChecked'>;

export const CheckboxTemplate: Story<CheckboxStoryProps> = ({ children, ...args }) => (
    <Checkbox {...args}>{children}</Checkbox>
);

CheckboxTemplate.storyName = 'Checkbox';
