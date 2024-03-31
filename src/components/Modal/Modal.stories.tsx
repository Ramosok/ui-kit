import React, { useState } from 'react';
import type { Story, Meta } from '@storybook/react';
import styles from './Modal.stories.module.scss';
import { Modal, ModalProps } from './Modal';
import { Button } from '../Button';

export type ModalStoryProps = Pick<ModalProps, 'showCloseBtn'>;

export default {
    title: 'components',
    component: Modal,
    args: {
        showCloseBtn: true,
    },
    parameters: {
        controls: {
            exclude: ['trigger', 'className', 'onOpenChange', 'isOpen'],
        },
    },
} as Meta<ModalStoryProps>;

export const ModalTemplate: Story<ModalStoryProps> = (args) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Modal {...args} isOpen={openModal} onOpenChange={setOpenModal}>
                <div>
                    <p className={styles.modalTitle}>Lorem Ipsum</p>
                    <p className={styles.modalContent}>
                        Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </Modal>
            <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
        </>
    );
};

ModalTemplate.storyName = 'Modal';
