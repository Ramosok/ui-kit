import React from 'react';
import { InnerHTMLComponent, InnerHTMLComponentProps } from './InnerHTMLComponent';
import type { Story, Meta } from '@storybook/react';

export default {
    title: 'components',
    component: InnerHTMLComponent,
    args: {
        html: '<p>This is some <strong>HTML</strong> content.</p>',
    },
} as Meta<InnerHTMLComponentProps>;

export const InnerHTMLComponentTemplate: Story<InnerHTMLComponentProps> = (args) => <InnerHTMLComponent {...args} />;

InnerHTMLComponentTemplate.storyName = 'InnerHTMLComponent';
