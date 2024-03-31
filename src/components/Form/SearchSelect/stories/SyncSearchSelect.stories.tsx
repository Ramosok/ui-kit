import React, { useEffect, useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import { SearchSelect, type SearchSelectProps } from '../SearchSelect';
import { forceReRender } from '@storybook/react';
import { Button } from '../../../Button';
import { Modal } from '../../../Modal';
import type { SearchSelectOption } from '..';

export type SearchSelectStoryProps = Pick<
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

const TEST_STRING =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)";
const TEST_STRING_REPEAT_COUNT = 2;

export const SyncSearchSelectTemplate: Story<SearchSelectStoryProps> = ({ debounceTimeout, ...args }) => {
    const [options, setOptions] = useState<SearchSelectOption[]>([]);
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

    const fetchInitialOptions = async (): Promise<void> => {
        setIsInitialLoading(true);
        fetchOptions()
            .then((fetchedOptions) => {
                setOptions(fetchedOptions);
            })
            .finally(() => {
                setIsInitialLoading(false);
            });
    };

    const onSelect = (option: string): void => {
        setSelectedValue(option);
    };

    const onOpen = ({ firstTimeOpened }: { firstTimeOpened?: boolean }): void => {
        if (firstTimeOpened) {
            fetchInitialOptions();
        }
    };

    return (
        <main>
            <h1>Sync SearchSelect</h1>
            <SearchSelect
                {...args}
                asyncSearch={false}
                options={options}
                onSelect={onSelect}
                selectedValue={selectedValue}
                onOpen={onOpen}
                isInitialLoading={isInitialLoading}
                debounceTimeout={debounceTimeout}
            />
        </main>
    );
};

export const SyncSearchSelectInModal: Story<SearchSelectStoryProps> = (args) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    return (
        <>
            <h1>SyncSearchSelectInModal</h1>
            <Button onClick={() => setIsModalOpen(true)}>Open SyncSearchSelectInModal</Button>

            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <p>{TEST_STRING.repeat(TEST_STRING_REPEAT_COUNT)}</p>
                <SyncSearchSelectTemplate {...args} />
                <p>{TEST_STRING}</p>
            </Modal>
        </>
    );
};

SyncSearchSelectTemplate.storyName = 'Sync SearchSelect';
SyncSearchSelectInModal.storyName = 'Sync SearchSelect in Modal';
