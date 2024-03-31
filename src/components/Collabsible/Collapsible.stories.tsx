import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Collapsible, CollapsibleProps } from './Collapsible';
import type { CollapsibleContentColor, CollapsibleTriggerColor } from './interface';

export default {
    title: 'components',
    component: Collapsible,
    args: {
        trigger: 'Trigger Name',
        children: 'Context Name',
        triggerColor: 'grey',
        contentColor: 'white',
        disabled: false,
        rounding: true,
    },
    argTypes: {
        trigger: {
            control: 'text',
        },
        content: {
            control: 'text',
        },
        triggerColor: {
            options: ['grey', 'white'] as CollapsibleTriggerColor[],
            control: { type: 'select' },
        },
        contentColor: {
            options: ['grey', 'white'] as CollapsibleContentColor[],
            control: { type: 'select' },
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
        controls: {
            exclude: ['className', 'onOpenCollapse', 'arrowClass', 'triggerStyle', 'isOpen', 'value'],
        },
    },
} as Meta<CollapsibleStoryProps>;

type CollapsibleStoryProps = Pick<
    CollapsibleProps,
    'trigger' | 'children' | 'triggerColor' | 'contentColor' | 'rounding' | 'disabled'
>;

export const CollapsibleTemplate: Story<CollapsibleStoryProps> = ({ children, trigger, ...args }) => {
    return (
        <Collapsible trigger={<div>{trigger}</div>} {...args}>
            {children}
        </Collapsible>
    );
};

CollapsibleTemplate.storyName = 'Collapsible';
