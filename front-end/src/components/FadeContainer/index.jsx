import cx from "~/utils/cx";

function FadeContainer({ className = "", children }) {
    return (
        <div
            className={cx(
                "relative",
                "before:w-[200px] before:h-full before:inline-block",
                "before:absolute before:top-0 before:left-0",
                "before:bg-login-fade-before",
                "after:w-[200px] after:h-full after:inline-block",
                "after:absolute after:top-0 after:right-0",
                "after:bg-login-fade-after",
                className
            )}
        >
            {children}
        </div>
    );
}

export default FadeContainer;
