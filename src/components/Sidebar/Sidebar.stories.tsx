import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { Button } from 'components/Button';
import { Sidebar, SidebarProps } from './Sidebar';
import styles from './Sidebar.stories.module.scss';

export default {
    title: 'components/Sidebar',
    component: Sidebar,
    parameters: {
        controls: {
            exclude: ['close', 'isOpen', 'header'],
        },
    },
} as Meta<SidebarProps>;

export const SidebarTemplate: Story<SidebarProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Sidebar trigger</Button>
            <Sidebar {...args} header={<div>Header</div>} isOpen={isOpen} close={() => setIsOpen((prev) => !prev)}>
                <div className={styles.storiesContent}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>
                        Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </Sidebar>
        </>
    );
};

SidebarTemplate.storyName = 'Sidebar';
