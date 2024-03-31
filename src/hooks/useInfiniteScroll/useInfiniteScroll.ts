import { useRef, MutableRefObject, useCallback } from 'react';

export interface UseInfiniteScrollInput {
    hasMore: boolean;
    loading: boolean;
    onLoadMore(): void;
    disabled?: boolean;
    scrollBottomOffset?: number;
}

export interface UseInfiniteScrollOutput {
    scrollableRef: MutableRefObject<HTMLDivElement>;
    onScroll?: () => void;
    isContainerScrollable(): boolean;
}

export const useInfiniteScroll = ({
    hasMore,
    onLoadMore,
    loading,
    disabled = false,
    scrollBottomOffset,
}: UseInfiniteScrollInput): UseInfiniteScrollOutput => {
    const scrollableRef = useRef<HTMLDivElement>();

    const isOnScrollDisabled = disabled || !hasMore;

    const isScrollReachedBottom = useCallback((scrollableHTML: HTMLDivElement): boolean => {
        const { scrollHeight, clientHeight, scrollTop: scrollTopValue } = scrollableHTML;
        const scrollTop = Math.ceil(scrollTopValue);
        let currentScrollY = scrollTop + clientHeight;
        if (scrollBottomOffset) {
            currentScrollY += scrollBottomOffset;
        }

        return currentScrollY >= scrollHeight;
    }, []);

    const isContainerScrollable = useCallback(() => {
        const scrollableHTML = scrollableRef.current;
        if (!scrollableHTML) {
            return false;
        }

        const { scrollHeight, clientHeight } = scrollableHTML;
        return scrollHeight > clientHeight;
    }, []);

    const onScroll = (): void => {
        if (!loading) {
            const scrollableHTML = scrollableRef.current;
            if (scrollableHTML && isScrollReachedBottom(scrollableHTML)) {
                onLoadMore();
            }
        }
    };

    return {
        scrollableRef,
        onScroll: !isOnScrollDisabled ? onScroll : undefined,
        isContainerScrollable,
    };
};
