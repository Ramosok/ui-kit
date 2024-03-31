import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { RadioGroup, RadioGroupProps } from '../RadioGroup';
import { DeleteIcon } from 'components/Icons';
import type { RadioGroupItem } from '../interface';
import styles from './RadioGroup.stories.module.scss';

type RadioGroupStoryProps = Pick<RadioGroupProps, 'disabled' | 'error'>;

const MOCKED_STATE = [
    {
        value: 'value',
        label: 'Radio with content',
        content: (
            <div>
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took
                a galley of type and scrambled it to make a type specimen book.
            </div>
        ),
    },
    {
        value: 'value1',
        label: 'label1',
    },
    {
        value: 'value2',
        label: 'label2',
    },
];

export default {
    title: 'components/Form/RadioGroup',
    component: RadioGroup,
    args: {
        error: '',
        disabled: false,
    },
    argTypes: {
        error: {
            control: 'text',
        },
    },
    parameters: {
        controls: {
            include: ['disabled', 'error'],
        },
    },
} as Meta<RadioGroupStoryProps>;

export const RadioGroupTemplate: Story<RadioGroupProps> = ({ disabled, ...args }) => {
    const [items, setItems] = useState(MOCKED_STATE);

    const onDelete = (itemToDelete: RadioGroupItem): void => {
        setItems((prevItems) => prevItems.filter((item) => item.value !== itemToDelete.value));
    };

    return (
        <RadioGroup {...args} disabled={disabled} items={items}>
            {(item) => <DeleteIcon className={styles.deleteIcon} onClick={!disabled && (() => onDelete(item))} />}
        </RadioGroup>
    );
};

RadioGroupTemplate.storyName = 'RadioGroup';
