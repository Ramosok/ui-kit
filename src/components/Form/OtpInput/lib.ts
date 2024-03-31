import type { OtpInputEvent } from 'components/Form/OtpInput/interface';
import type { ClipboardEvent } from 'react';

export const getPastedDataFromClipboard = (
    e: OtpInputEvent<ClipboardEvent<HTMLInputElement>>,
    reValidPattern: RegExp,
    slicedToNumber: number
): string => {
    return e.clipboardData.getData('text').trim().match(reValidPattern)?.join('').slice(0, slicedToNumber);
};
