import cx from "~/utils/cx";

function OnlineSignal() {
    return (
        <div className={cx("flex items-center gap-[4px]")}>
            <span
                className={cx(
                    "inline-block w-[10px] h-[10px]",
                    "bg-online-signal",
                    "rounded-full",
                    "shadow-online-signal",
                    "animate-online-signal"
                )}
            />
            <span className={cx("text-online-number")}>
                200 <span className={cx("text-secondary")}>Online</span>
            </span>
        </div>
    );
}

export default OnlineSignal;
