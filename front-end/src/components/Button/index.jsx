import { Link } from "react-router-dom";

import cx from "~/utils/cx";

const buttonClassNames = cx(
    "text-button-label font-[600]",
    "bg-button",
    "hover:bg-button-hover",
    "active:bg-button",
    "rounded-[999px]",
    "transition-all",
    "hover:translate-y-[-3px]",
    "active:translate-y-0"
);

function Button({ className = "", href = "", ...props }) {
    let Component = "button";
    const _props = { ...props };

    if (href) {
        Component = Link;
        _props.to = href;
    }

    return (
        <Component
            {..._props}
            className={cx("px-[14px] py-[8px]", buttonClassNames, className)}
        />
    );
}

function IconButton({ className = "", href = "", children, ...props }) {
    let Component = "button";
    const _props = { ...props };

    if (href) {
        Component = Link;
        _props.to = href;
    }

    return (
        <Component
            {..._props}
            className={cx(
                "w-[40px] h-[40px]",
                "relative",
                buttonClassNames,
                className
            )}
        >
            <span
                className={cx(
                    "absolute top-1/2 left-1/2",
                    "-translate-x-1/2 -translate-y-1/2"
                )}
            >
                {children}
            </span>
        </Component>
    );
}

export { IconButton };

export default Button;
