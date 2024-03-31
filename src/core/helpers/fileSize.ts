export const convertBytesInMegabytes = (sizeInBytes: number): number => {
    const bytesInMegabyte = 1048576;
    const fractionDigits = 2;
    return parseFloat((sizeInBytes / bytesInMegabyte).toFixed(fractionDigits));
};

export const convertMegabytesToBytes = (megabytes: number): number => {
    const kilobytesInMegabyte = 1024;
    const bytesInKilobyte = 1024;
    return megabytes * kilobytesInMegabyte * bytesInKilobyte;
};
