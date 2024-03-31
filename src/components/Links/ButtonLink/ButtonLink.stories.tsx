import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { ButtonLink, type ButtonLinkProps } from './ButtonLink';
import type { LinkColor } from '../interface';

export type ButtonLinkStoryProps = Pick<ButtonLinkProps, 'color' | 'title' | 'disabled'>;

export default {
    title: 'components/Links/ButtonLink',
    component: ButtonLink,
    args: {
        title: 'ButtonLink',
        color: 'primary',
        disabled: false,
    },
    argTypes: {
        color: {
            options: ['dark', 'primary', 'default', 'light', 'white'] as LinkColor[],
            control: { type: 'select' },
        },
    },
    parameters: {
        controls: {
            include: ['title', 'color', 'disabled'],
        },
    },
} as Meta<ButtonLinkStoryProps>;

export const ButtonLinkTemplate: Story<ButtonLinkStoryProps> = ({ title, ...args }) => (
    <ButtonLink {...args}>{title}</ButtonLink>
);

ButtonLinkTemplate.storyName = 'ButtonLink';
