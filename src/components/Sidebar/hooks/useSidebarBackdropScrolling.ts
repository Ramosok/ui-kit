import { useEffect } from 'react';

export const useSidebarBackdropScrolling = ({ isSidebarOpen }: { isSidebarOpen: boolean }): void => {
    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.overflow = isSidebarOpen ? 'hidden' : 'initial';
        }
    }, [isSidebarOpen]);
};
