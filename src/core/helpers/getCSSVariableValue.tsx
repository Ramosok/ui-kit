export const getCSSVariableValue = (variableName: string, parseValue = false): string | number => {
    if (document.documentElement) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(`--${variableName}`);
        if (parseValue) {
            return Number.parseFloat(value);
        }

        return value;
    }

    return '';
};
