export const isObjectsShallowEqual = <T = Record<string, unknown>>(obj1: T, obj2: T): boolean => {
    const obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return false;
    }

    return obj1Keys.every((key) => obj1[key as keyof T] === obj2[key as keyof T]);
};
