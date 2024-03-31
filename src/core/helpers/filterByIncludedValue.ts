export const filterByIncludedValue = (valueToCheck: string, searchValue: string): boolean =>
    searchValue ? valueToCheck.toLowerCase().includes(searchValue.toLowerCase()) : true;
