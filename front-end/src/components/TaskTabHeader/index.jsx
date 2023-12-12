import cx from "~/utils/cx";

function TaskTabHeader({ children, className = "" }) {
    return (
        <div
            className={cx(
                "h-task-tab-header px-[16px]",
                "bg-[#21272d]",
                className
            )}
        >
            {children}
        </div>
    );
}

export default TaskTabHeader;
