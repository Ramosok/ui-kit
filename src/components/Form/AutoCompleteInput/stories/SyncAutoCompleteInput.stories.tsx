import React, { useEffect, useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { forceReRender } from '@storybook/react';
import { AutoCompleteInput, type AutoCompleteInputProps } from '../AutoCompleteInput';
import type { SearchOption } from 'core/hooks';

type AutoCompleteInputStoryProps = Pick<
    AutoCompleteInputProps,
    'placeholder' | 'disabled' | 'debounceTimeout' | 'error'
>;

export default {
    title: 'components/Form/AutoCompleteInput',
    component: AutoCompleteInput,
    args: {
        error: '',
        placeholder: 'Выберите банк',
        debounceTimeout: 300,
        disabled: false,
    },
    argTypes: {
        debounceTimeout: {
            control: { type: 'number', min: 0, max: 3000, step: 100 },
        },
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            include: ['error', 'placeholder', 'disabled', 'debounceTimeout'],
        },
    },
} as Meta<AutoCompleteInputStoryProps>;

export const SyncAutoCompleteInputTemplate: Story<AutoCompleteInputStoryProps> = ({ debounceTimeout, ...args }) => {
    const [options, setOptions] = useState<SearchOption[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        forceReRender();
    }, [debounceTimeout]);

    const fetchOptions = (): Promise<SearchOption[]> =>
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then((resOptions: { title: string; id: string }[]) =>
                (resOptions || []).map((resOption) => ({
                    value: resOption.title,
                    label: resOption.title,
                }))
            )
            .catch(() => []);

    const fetchInitialOptions = async (): Promise<void> => {
        fetchOptions().then((fetchedOptions) => {
            setOptions(fetchedOptions);
        });
    };

    return (
        <main>
            <h1>Sync AutoCompleteInput</h1>
            <AutoCompleteInput
                {...args}
                value={inputValue}
                onChange={setInputValue}
                options={options}
                onInitialSearch={fetchInitialOptions}
                debounceTimeout={debounceTimeout}
                searchBy="label"
            />
        </main>
    );
};

SyncAutoCompleteInputTemplate.storyName = 'Sync AutoCompleteInput';
