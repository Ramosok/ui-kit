import React from 'react';
import type { FC } from 'react';
import { classNames } from 'core/helpers';
import { DropsIcon } from 'components/Icons';
import styles from './TriggerContent.module.scss';
import type { SearchOption } from 'core/hooks';

export interface TriggerContentProps {
    selectedOption: SearchOption | null;
    disabled: boolean;
    isContentOpened: boolean;
    placeholder?: string;
}

export const TriggerContent: FC<TriggerContentProps> = ({ selectedOption, disabled, isContentOpened, placeholder }) => {
    return (
        <>
            {selectedOption ? (
                <span
                    className={classNames({
                        [styles.triggerLabel]: true,
                        [styles.triggerSelectValue]: true,
                        [styles.disabled]: disabled,
                    })}
                >
                    {selectedOption.label}
                </span>
            ) : (
                <span
                    className={classNames({
                        [styles.triggerLabel]: true,
                        [styles.triggerPlaceholder]: true,
                        [styles.disabled]: disabled,
                    })}
                >
                    {placeholder}
                </span>
            )}
            <DropsIcon
                className={classNames({
                    [styles.triggerIcon]: true,
                    [styles.opened]: isContentOpened,
                    [styles.disabled]: disabled,
                })}
            />
        </>
    );
};
