import cx from "~/utils/cx";

function OnlineSignal() {
    return (
        <div className={cx("flex items-center gap-[4px]")}>
            <span
                className={cx(
                    "inline-block w-[10px] h-[10px]",
                    "bg-[#ffdf00]",
                    "rounded-full",
                    "shadow-online-signal",
                    "animate-online-signal"
                )}
            />
            <span className={cx("text-[#cbd1e1]")}>
                200 <span className={cx("text-[#6b7b8e]")}>Online</span>
            </span>
        </div>
    );
}

export default OnlineSignal;
