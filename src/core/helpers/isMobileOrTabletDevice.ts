import { isMobile } from 'is-mobile';

const DEVICES_CONFIG: {
    isMobileOrTablet: boolean;
} = {
    isMobileOrTablet: isMobile({ tablet: true }),
};

export const isMobileOrTabletDevice = (): boolean => DEVICES_CONFIG.isMobileOrTablet;
