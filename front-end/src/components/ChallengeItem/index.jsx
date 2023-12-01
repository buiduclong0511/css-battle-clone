import cx from "~/utils/cx";
import Tag from "../Tag";
import Play from "../icons/Play";
import { IconButton } from "../Button";

function ChallengeItem({ active = false }) {
    return (
        <div className={cx("flex flex-col items-center gap-[16px]")}>
            <Tag>NOV 26</Tag>
            <div
                className={cx(
                    "border-[2px] border-[#27313a]",
                    "rounded-[16px]",
                    "p-[9px]",
                    "transition-all",
                    "hover:scale-[1.05]",
                    "cursor-pointer",
                    {
                        "shadow-task-active": active,
                    }
                )}
            >
                <img
                    src="/images/target.png"
                    alt=""
                    className={cx("rounded-[8px]")}
                />
                <div
                    className={cx(
                        "px-[16px] py-[8px] pt-[16px]",
                        "flex items-center justify-between"
                    )}
                >
                    <div>
                        <p
                            className={cx(
                                "text-[#6b7b8e] text-[16px] font-[500]"
                            )}
                        >
                            Your hi-score
                        </p>
                        <p className={cx("text-[#a0b3c6]")}>Not played</p>
                    </div>
                    <IconButton
                        className={cx(
                            "bg-[#0060ca]",
                            "text-[#fff]",
                            "shadow-play-button"
                        )}
                    >
                        <Play />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default ChallengeItem;
