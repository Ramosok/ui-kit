import React, { useState } from 'react';
import type { Story, Meta } from '@storybook/react';
import { Switch, type SwitchProps } from './Switch';

export type SwitchStoryProps = Omit<SwitchProps, 'switchLabel'>;

export default {
    title: 'components/Form/Switch',
    component: Switch,
    args: {
        switchLabel: 'Switch Label',
        activeSwitchColor: 'greenLight',
        disabled: false,
    },
    argTypes: {
        activeSwitchColor: {
            options: ['blue', 'greenLight'],
            control: { type: 'select' },
        },
    },
    parameters: {
        controls: {
            exclude: ['onCheckedChange', 'asChild'],
        },
    },
} as Meta<SwitchStoryProps>;

export const SwitchTemplate: Story<SwitchStoryProps> = (args) => {
    const [checked, setChecked] = useState<boolean>(false);

    return <Switch {...args} checked={checked} onCheckedChange={(value) => setChecked(value)} />;
};

SwitchTemplate.storyName = 'Switch';
