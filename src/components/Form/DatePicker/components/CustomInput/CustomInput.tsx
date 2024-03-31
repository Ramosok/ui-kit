import React, { forwardRef } from 'react';
import { PatternMaskedInput, type PatternMaskedInputProps } from 'components/Form/MaskedInput';
import { CalendarIcon } from 'components/Icons';
import styles from './CustomInput.module.scss';

export const CustomInput = forwardRef<HTMLInputElement, PatternMaskedInputProps>((componentProps, ref) => {
    const { ...props } = componentProps;

    return (
        <>
            <PatternMaskedInput {...props} mask="_" type="text" ref={ref} />
            <div className={styles.icon}>
                <CalendarIcon />
            </div>
        </>
    );
});
