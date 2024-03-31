import React, { forwardRef } from 'react';
import styles from './OptionsList.module.scss';
import { classNames } from 'core/helpers';
import type { SearchOption } from 'core/hooks';

export interface OptionsListProps {
    options: SearchOption[];
    selectedValue?: string;
    onSelect: (option: SearchOption) => void;
    listClassName?: string;
    optionClassName?: string;
}

export const OptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    ({ options, selectedValue, onSelect, listClassName, optionClassName }, listRef) => {
        return (
            <div
                ref={listRef}
                className={classNames({
                    [styles.optionsContainer]: true,
                    [listClassName]: !!listClassName,
                })}
            >
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.value}
                        className={classNames({
                            [styles.option]: true,
                            [styles.selected]: option.value === selectedValue,
                            [optionClassName]: !!optionClassName,
                        })}
                        value={option.value}
                        onClick={() => onSelect(option)}
                    >
                        <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                ))}
            </div>
        );
    }
);
