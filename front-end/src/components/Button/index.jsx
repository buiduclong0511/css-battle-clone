import { Link } from "react-router-dom";

import cx from "~/utils/cx";

const buttonClassNames = cx(
    "flex items-center justify-center gap-[4px]",
    "text-[#fff] font-[600]",
    "bg-[rgb(50,63,74)]",
    "hover:bg-[rgb(50,63,74)]-hover",
    "active:bg-[rgb(50,63,74)]",
    "rounded-[999px]",
    "transition-all",
    "hover:translate-y-[-3px]",
    "active:translate-y-0",
    "disabled:opacity-[0.4] disabled:pointer-events-none"
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
