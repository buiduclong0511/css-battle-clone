import { isString } from "lodash";
import { twMerge } from "tailwind-merge";

const cx = (...args) => {
    const classNames = args
        .map((item) => {
            if (isString(item)) {
                return item;
            }

            return Object.keys(item)
                .filter((key) => item[key])
                .join(" ");
        })
        .join(" ");

    return twMerge(classNames);
};

export default cx;
