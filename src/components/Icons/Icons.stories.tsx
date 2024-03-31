import React, { FC } from 'react';
import * as Icons from './index';
import type { Meta, Story } from '@storybook/react';
import type { IconProps } from './index';

const ICONS_DISPLAY_NAME = Object.keys(Icons);
const ICON_COMPONENTS = Object.entries(Icons);

type IconStoryProps = Pick<IconProps, 'size'> & {
    fill: string;
    selectedIcon: keyof typeof Icons & 'All';
};

export default {
    title: 'components',
    component: Icons.InfoIcon,
    args: {
        size: 2,
        selectedIcon: 'All',
        color: '#000000',
    },
    argTypes: {
        size: {
            name: 'Size (width and height) in rem',
            control: { type: 'number', min: 1, max: 15, step: 1 },
        },
        selectedIcon: {
            options: ['All', ...ICONS_DISPLAY_NAME] as IconStoryProps['selectedIcon'][],
            control: { type: 'select' },
        },
        color: {
            control: { type: 'color' },
        },
    },
} as Meta<IconProps>;

export const IconTemplate: Story<IconStoryProps> = ({ size, selectedIcon, ...args }) => {
    if (selectedIcon === 'All') {
        return (
            <>
                {ICON_COMPONENTS.map(([iconKey, IconComponent]) => (
                    <IconComponent key={iconKey} width={`${size}rem`} height={`${size}rem`} {...args} />
                ))}
            </>
        );
    }
    const SelectedIconComponent = Icons[selectedIcon] as FC<IconProps>;

    return <SelectedIconComponent width={`${size}rem`} height={`${size}rem`} {...args} />;
};

IconTemplate.storyName = 'Icons';
