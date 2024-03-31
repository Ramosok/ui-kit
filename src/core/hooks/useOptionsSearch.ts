import { filterByIncludedValue } from 'core/helpers';

export interface SearchOption {
    value: string;
    label: string;
}

export type OptionsFilter = (args: {
    option: SearchOption;
    searchValue: string;
    index?: number;
    options?: SearchOption[];
}) => boolean;

export interface UseOptionsSearchInput {
    asyncSearch?: boolean;
    options: SearchOption[];
    searchValue: string;
    optionsFilter: OptionsFilter;
    searchBy?: 'value' | 'label';
}

export interface UseOptionsSearchOutput {
    options: SearchOption[];
}

export const useOptionsSearch = ({
    asyncSearch,
    searchValue,
    optionsFilter,
    options,
    searchBy = 'label',
}: UseOptionsSearchInput): UseOptionsSearchOutput => {
    const getFinalOptions = (): SearchOption[] => {
        if (asyncSearch || !searchValue) {
            return options;
        }

        return options.filter((option, index, curOptions) => {
            if (optionsFilter) {
                return optionsFilter({
                    option,
                    index,
                    options: curOptions,
                    searchValue,
                });
            }

            return filterByIncludedValue(option[searchBy], searchValue);
        });
    };

    return {
        options: getFinalOptions(),
    };
};
