import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { AnchorLink, type AnchorLinkProps } from './AnchorLink';
import type { LinkColor } from '../interface';

export type AnchorLinkStoryProps = Pick<AnchorLinkProps, 'title' | 'color' | 'href' | 'blank' | 'download'>;

export default {
    title: 'components/Links/AnchorLink',
    component: AnchorLink,
    args: {
        title: 'AnchorLink',
        color: 'primary',
    },
    argTypes: {
        color: {
            options: ['dark', 'primary', 'default', 'light', 'white'] as LinkColor[],
            control: { type: 'select' },
        },
    },
    parameters: {
        controls: {
            include: ['title', 'color', 'href', 'blank', 'download'],
        },
    },
} as Meta<AnchorLinkStoryProps>;

export const AnchorLinkTemplate: Story<AnchorLinkStoryProps> = ({ title, ...args }) => {
    return <AnchorLink {...args}>{title}</AnchorLink>;
};

AnchorLinkTemplate.storyName = 'AnchorLink';
