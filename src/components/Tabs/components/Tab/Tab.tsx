import React, { type ReactNode, type FC } from 'react';
import * as TabsComponent from '@radix-ui/react-tabs';
import styles from './Tab.module.scss';
import { classNames } from 'core/helpers';

export interface TabProps {
    name: ReactNode | string;
    value: string;
    disabled?: boolean;
    children?: ReactNode | string;
    className?: string;
}

export const Tab: FC<TabProps> = ({ children, value, className }) => (
    <TabsComponent.Content className={classNames([styles.tabContent, className])} value={value}>
        {children}
    </TabsComponent.Content>
);
