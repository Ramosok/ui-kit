import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Tabs, type TabsProps } from './Tabs';
import type { TabProps } from './components/Tab/Tab';
import styles from './Tabs.module.scss';

const TABS: Array<TabProps> = [
    {
        name: 'ReactElementChildren',
        value: 'ReactElementChildren',
        disabled: false,
        children: <div className={styles.tabExampleContent}>React element</div>,
    },
    {
        name: 'StringChildren',
        value: 'StringChildren',
        disabled: false,
        children: 'string children',
    },
    {
        name: 'WithoutChildren',
        value: 'WithoutChildren',
        disabled: false,
    },
];

export type TabsStoryProps = Pick<TabsProps, 'tabs'>;

export default {
    title: 'components',
    component: Tabs,
    parameters: {
        controls: {
            include: [],
        },
    },
} as Meta<TabsStoryProps>;

export const TabsTemplate: Story<TabsStoryProps> = (args) => <Tabs tabs={TABS} {...args} />;

TabsTemplate.storyName = 'Tabs';
