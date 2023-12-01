import cx from "~/utils/cx";

function Tag({ children }) {
    return (
        <span
            className={cx(
                "px-[8px] py-[2px]",
                "text-[14px] text-[#cbd1e1]",
                "bg-[#2d363f]",
                "shadow-tag",
                "rounded-[4px]"
            )}
        >
            {children}
        </span>
    );
}

export default Tag;
