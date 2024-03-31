import React, { useState, FC, useEffect, useCallback } from 'react';
import type { Story, Meta } from '@storybook/react';
import { useInfiniteScroll, UseInfiniteScrollInput } from './useInfiniteScroll';
import styles from './useInfiniteScroll.stories.module.scss';

type InfiniteScrollStoryProps = Pick<UseInfiniteScrollInput, 'disabled' | 'scrollBottomOffset'>;

interface FetchMockItemsConfigParam {
    size?: number;
    page?: number;
    timeout?: number;
}

const MOCK_ITEMS = Array.from({ length: 17 }, (_, index) => ({ value: index + 1 }));

const fetchMockItems = ({
    size = 5,
    page = 1,
    timeout = 2000,
}: FetchMockItemsConfigParam): Promise<{ items: { value: number }[]; total: number }> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                items: MOCK_ITEMS.slice((page - 1) * size, size * page),
                total: MOCK_ITEMS.length,
            });
        }, timeout);
    });

const VirtualScroll: FC<InfiniteScrollStoryProps> = (props) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<number>(Number.MAX_VALUE);

    const hasMore = total > items.length;

    const loadMore = useCallback(
        async (config?: FetchMockItemsConfigParam): Promise<void> => {
            setIsLoading(true);
            const data = await fetchMockItems({ size: 5, page, timeout: 1000, ...(config || {}) });
            setTotal(data.total);
            setItems((prevItems) => prevItems.concat(data.items));
            setIsLoading(false);
            setPage((prevPage) => prevPage + 1);
        },
        [page]
    );

    useEffect(() => {
        loadMore({ timeout: 0 });
    }, []);

    const { scrollableRef, onScroll } = useInfiniteScroll({
        hasMore,
        loading: isLoading,
        onLoadMore: loadMore,
        ...props,
    });

    return (
        <div ref={scrollableRef} className={styles.scrollableContainer} onScroll={onScroll}>
            {items.map((item) => (
                <div key={item.value} className={styles.item}>
                    {item.value}
                </div>
            ))}
            {isLoading && <i>loading...</i>}
            {!hasMore && <i>no more items...</i>}
        </div>
    );
};

export default {
    title: 'hooks',
    component: VirtualScroll,
    args: {
        disabled: false,
        scrollBottomOffset: 0,
    },
    argTypes: {
        scrollBottomOffset: {
            name: 'scrollBottomOffset (in rem)',
            control: { type: 'number', step: 1 },
        },
    },
} as Meta<InfiniteScrollStoryProps>;

export const InfiniteScrollTemplate: Story<InfiniteScrollStoryProps> = (args) => <VirtualScroll {...args} />;

InfiniteScrollTemplate.storyName = 'useInfiniteScroll';
