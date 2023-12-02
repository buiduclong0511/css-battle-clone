import cx from "~/utils/cx";

function Checkbox({ children, id, ...props }) {
    return (
        <div className={cx("flex items-center gap-[8px]", "cursor-pointer")}>
            <input
                type="checkbox"
                id={id}
                className={cx("cursor-pointer")}
                {...props}
            />
            <label htmlFor={id} className={cx("cursor-pointer")}>
                {children}
            </label>
        </div>
    );
}

export default Checkbox;
