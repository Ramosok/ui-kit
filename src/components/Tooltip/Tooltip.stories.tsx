import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Tooltip, type TooltipProps } from './Tooltip';
import { DEFAULT_ALIGN_OFFSET } from './const';
import { ReactComponent as InfoIcon } from 'core/assets/img/info.svg';
import styles from './Tooltip.module.scss';

export type TooltipStoryProps = Omit<TooltipProps, 'children'>;

export default {
    title: 'components',
    component: Tooltip,
    args: {
        placement: 'top',
        color: 'primary',
        align: 'end',
        alignOffset: DEFAULT_ALIGN_OFFSET,
        content: 'Tooltip content',
    },
    argTypes: {
        placement: {
            options: ['bottom', 'top', 'right', 'left'],
        },
        color: {
            options: ['primary', 'light'],
        },
        align: {
            options: ['start', 'center', 'end'],
        },
        content: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: {
            include: ['content', 'placement', 'color', 'align', 'alignOffset'],
        },
    },
    decorators: [
        (Story) => (
            <div className={styles.wrapperTooltip}>
                <Story />
            </div>
        ),
    ],
} as Meta<TooltipStoryProps>;

export const TooltipTemplate: Story<TooltipStoryProps> = (args) => {
    return (
        <Tooltip {...args}>
            <InfoIcon className={styles.infoIcon} />
        </Tooltip>
    );
};

TooltipTemplate.storyName = 'Tooltip';
