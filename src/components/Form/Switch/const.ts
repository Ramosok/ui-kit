import styles from './Switch.module.scss';

type Classes = Record<string, string>;

export const ACTIVE_SWITCH_COLOR_CLASSES: Classes = {
    greenLight: styles.switchActiveGreenLightColor,
    blue: styles.switchActiveBlueColor,
};
