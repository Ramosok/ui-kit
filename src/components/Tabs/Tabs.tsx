import React, { type FC } from 'react';
import * as TabsComponent from '@radix-ui/react-tabs';
import styles from './Tabs.module.scss';
import { Tab, type TabProps } from './components/Tab/Tab';
import { classNames } from '../../core/helpers';

export interface TabsProps {
    tabs: TabProps[];
    defaultValue?: string;
    selectedTab?: string;
    onTabChange?: (value: string) => void;
    className?: string;
    listClassName?: string;
    tabContentClassName?: string;
    tabClassName?: string;
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    defaultValue = tabs[0].value,
    selectedTab,
    onTabChange,
    className,
    listClassName,
    tabClassName,
    tabContentClassName,
}) => {
    return (
        <TabsComponent.Root
            className={classNames([styles.tabs, className])}
            defaultValue={defaultValue}
            activationMode="manual"
            value={selectedTab}
            onValueChange={onTabChange}
        >
            <TabsComponent.List className={classNames([styles.tabList, listClassName])}>
                {tabs.map(({ name, value, disabled }) => (
                    <div key={value} className={styles.tabWidth}>
                        <TabsComponent.Trigger
                            disabled={disabled}
                            className={classNames([styles.tab, tabClassName])}
                            value={value}
                        >
                            {name}
                        </TabsComponent.Trigger>
                    </div>
                ))}
            </TabsComponent.List>
            {tabs.map(({ children, name, value }) => (
                <Tab className={tabContentClassName} name={name} value={value} key={value}>
                    {children}
                </Tab>
            ))}
        </TabsComponent.Root>
    );
};
