interface PatternMaskedInfo {
    patternInitialCode: string;
    maxValueLength: number;
}
const PATTERN_CHAR = '#';

export const getPatternMaskedInfo = (format: string, patternChar: string = PATTERN_CHAR): PatternMaskedInfo => ({
    patternInitialCode: format?.match(/(\d+)/g)?.join('') || '',
    maxValueLength: format?.match(new RegExp(patternChar, 'g'))?.length || 0,
});
