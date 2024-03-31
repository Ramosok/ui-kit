export const addSeparatorsToNumber = (number: string, changeSort = true, separator = ' '): string => {
    if (number) {
        const numberParts = number?.replace(/\s/g, '').split('.');
        numberParts[0] = numberParts?.[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return changeSort ? numberParts?.join('.') : numberParts[0];
    }
    return number;
};
