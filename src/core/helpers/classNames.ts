export const classNames = (classes: Record<string, boolean> | Array<string>): string => {
    if (Array.isArray(classes)) {
        return classes.filter((className) => className).join(' ');
    }

    return Object.keys(classes)
        .filter((key) => classes[key] && key !== 'undefined')
        .map((key) => key)
        .join(' ');
};
