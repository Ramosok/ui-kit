import styles from './Spinner.module.scss';

type Classes = Record<string, string>;

export const LOADER_CONTAINER_SIZE_CLASSES: Classes = {
    sm: styles.containerSm,
    md: styles.containerMd,
    lg: styles.containerLg,
};

export const LOADER_SIZE_CLASSES: Classes = {
    sm: styles.loaderSm,
    md: styles.loaderMd,
    lg: styles.loaderLg,
};

export const LOADER_COLOR_CLASSES: Classes = {
    main: styles.loaderMain,
    white: styles.loaderWhite,
};

export const TENGE_SIZE_CLASSES: Classes = {
    sm: styles.tengeSm,
    md: styles.tengeMd,
    lg: styles.tengeLg,
};

export const TENGE_COLOR_CLASSES: Classes = {
    main: styles.tengeMain,
    white: styles.tengeWhite,
};
