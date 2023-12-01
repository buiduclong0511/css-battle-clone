import dayjs from "dayjs";
import images from "~/assets/images";
import cx from "~/utils/cx";
import CountDown from "../CountDown";
import Tag from "../Tag";
import Lock from "../icons/Lock";

function TomorrowChallenge() {
    let tomorrow = dayjs().add(1, "day");
    tomorrow = tomorrow.set("hours", 8);
    tomorrow = tomorrow.set("minutes", 0);
    tomorrow = tomorrow.set("seconds", 0);

    return (
        <div className={cx("flex flex-col items-center gap-[16px]")}>
            <Tag>TOMORROW</Tag>
            <div
                className={cx(
                    "border-[2px] border-[#27313a]",
                    "rounded-[16px]",
                    "p-[9px] w-full",
                    "transition-all"
                )}
            >
                <div className={cx("relative", "pt-[75%]", "tv-glitch")}>
                    <div
                        className={cx(
                            "absolute top-0 left-0",
                            "w-full h-full",
                            "flex items-center justify-center",
                            "bg-[rgba(0,0,0,.5)]",
                            "z-10"
                        )}
                    >
                        <Lock />
                    </div>
                    <img
                        src={images.tvGlitch}
                        className={cx(
                            "rounded-[8px]",
                            "absolute top-0 left-0",
                            "w-full h-full",
                            "object-cover"
                        )}
                    />
                </div>
                <div
                    className={cx(
                        "px-[16px] py-[8px] pt-[16px]",
                        "flex flex-col items-center gap-[8px]"
                    )}
                >
                    <span className={cx("text-[#6b7b8e]")}>Unlocks in</span>
                    <CountDown to={tomorrow} />
                </div>
            </div>
        </div>
    );
}

export default TomorrowChallenge;
