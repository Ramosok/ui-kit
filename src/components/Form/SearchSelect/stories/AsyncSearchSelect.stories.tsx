import React, { useEffect, useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { forceReRender } from '@storybook/react';
import { SearchSelect, type SearchSelectProps } from '../SearchSelect';
import type { SearchSelectOption } from '..';
import { filterByIncludedValue } from 'core/helpers';

type SearchSelectStoryProps = Pick<
    SearchSelectProps,
    | 'placeholder'
    | 'searchInputPlaceholder'
    | 'focusSearchInput'
    | 'disabled'
    | 'debounceTimeout'
    | 'noOptionsText'
    | 'error'
>;

export default {
    title: 'components/Form/SearchSelect',
    component: SearchSelect,
    args: {
        error: '',
        placeholder: 'Выберите банк',
        searchInputPlaceholder: 'Выберите или введите название банка',
        focusSearchInput: true,
        debounceTimeout: 300,
        disabled: false,
        noOptionsText: 'Ничего не найдено',
    },
    argTypes: {
        debounceTimeout: {
            control: { type: 'number', min: 0, max: 3000, step: 100 },
        },
        noOptionsText: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'text' },
        },
    },
    parameters: {
        controls: {
            include: [
                'error',
                'placeholder',
                'searchInputPlaceholder',
                'focusSearchInput',
                'disabled',
                'debounceTimeout',
                'noOptionsText',
            ],
        },
    },
} as Meta<SearchSelectStoryProps>;

export const AsyncSearchSelectTemplate: Story<SearchSelectStoryProps> = ({ debounceTimeout, ...args }) => {
    const [options, setOptions] = useState<SearchSelectOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(null);

    useEffect(() => {
        forceReRender();
    }, [debounceTimeout]);

    const fetchOptions = (): Promise<SearchSelectOption[]> =>
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then((resOptions: { title: string; id: string }[]) =>
                (resOptions || []).map((resOption) => ({
                    value: resOption.id,
                    label: resOption.title,
                }))
            )
            .catch(() => []);

    const fetchInitialOptions = async (
        { initialLoading }: { initialLoading: boolean } = { initialLoading: false }
    ): Promise<void> => {
        if (initialLoading) {
            setIsInitialLoading(true);
        } else {
            setIsLoading(true);
        }

        fetchOptions()
            .then((fetchedOptions) => {
                setOptions(fetchedOptions);
            })
            .finally(() => {
                if (initialLoading) {
                    setIsInitialLoading(false);
                } else {
                    setIsLoading(false);
                }
            });
    };

    const fetchMockOptionsBySearchValue = (searchValue: string): Promise<void> =>
        fetchOptions().then((fetchedOptions) => {
            setOptions(fetchedOptions.filter((option) => filterByIncludedValue(option.label, searchValue)));
        });

    const onSelect = (option: string): void => {
        setSelectedValue(option);
        fetchInitialOptions();
    };

    const onAsyncSearch = (searchValue: string): Promise<void> => {
        if (searchValue) {
            setIsLoading(true);
            fetchMockOptionsBySearchValue(searchValue).finally(() => {
                setIsLoading(false);
            });
            return Promise.resolve();
        }

        return fetchInitialOptions();
    };

    const onOpen = ({ firstTimeOpened }: { firstTimeOpened?: boolean }): void => {
        if (firstTimeOpened) {
            fetchInitialOptions({ initialLoading: true });
        }
    };

    return (
        <main>
            <h1>Async SearchSelect</h1>
            <SearchSelect
                {...args}
                asyncSearch
                onAsyncSearch={onAsyncSearch}
                onOpen={onOpen}
                options={options}
                onSelect={onSelect}
                selectedValue={selectedValue}
                isInitialLoading={isInitialLoading}
                isLoading={isLoading}
                debounceTimeout={debounceTimeout}
            />
        </main>
    );
};

AsyncSearchSelectTemplate.storyName = 'Async SearchSelect';
