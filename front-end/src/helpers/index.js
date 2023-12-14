import { reverse as _reverse } from "lodash";

export const reverse = (array = []) => {
    const _array = [...array];
    _reverse(_array);

    return _array;
};
