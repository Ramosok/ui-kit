import React, { forwardRef } from 'react';
import styles from './OptionsList.module.scss';
import { classNames } from 'core/helpers';
import type { SearchOption } from 'core/hooks';

export interface OptionsListProps {
    options: SearchOption[];
    onSelect: (option: SearchOption) => void;
    isOpen: boolean;
    listClassName: string;
    optionClassName: string;
}

export const OptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    ({ options, onSelect, isOpen, listClassName, optionClassName }, listRef) => {
        return (
            <div
                className={classNames({
                    [styles.content]: true,
                    [styles.opened]: isOpen,
                    [listClassName]: !!listClassName,
                })}
                ref={listRef}
            >
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.label}
                        className={classNames({
                            [styles.option]: true,
                            [optionClassName]: !!optionClassName,
                        })}
                        onClick={() => onSelect(option)}
                    >
                        <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                ))}
            </div>
        );
    }
);
