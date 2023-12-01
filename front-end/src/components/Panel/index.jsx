import cx from "~/utils/cx";

function Panel({ children, className = "" }) {
    return (
        <div
            className={cx(
                "p-panel",
                "bg-panel",
                "shadow-panel",
                "rounded-[16px]",
                className
            )}
        >
            {children}
        </div>
    );
}

export default Panel;
