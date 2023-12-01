import cx from "~/utils/cx";

function FadeContainer({ className = "", deep = false, children }) {
    return (
        <div
            className={cx(
                "relative",
                "before:w-[200px] before:h-full before:inline-block",
                "before:absolute before:top-0 before:left-0",
                "before:bg-fade-before-overlay",
                "before:pointer-events-none",
                "after:w-[200px] after:h-full after:inline-block",
                "after:absolute after:top-0 after:right-0",
                "after:bg-fade-after-overlay",
                "after:pointer-events-none",
                {
                    "after:bg-fade-after-overlay-deep before:bg-fade-before-overlay-deep":
                        deep,
                },
                className
            )}
        >
            {children}
        </div>
    );
}

export default FadeContainer;
