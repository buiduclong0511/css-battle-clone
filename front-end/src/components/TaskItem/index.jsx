import dayjs from "dayjs";
import { Link } from "react-router-dom";

import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";
import { IconButton } from "../Button";
import Tag from "../Tag";
import Play from "../icons/Play";
import { useMemo } from "react";

function TaskItem({ active = false, data, createdAtInline = false }) {
    const createdAtString = useMemo(() => {
        const day = dayjs(data.createdAt);
        const date = day.get("date");
        const month = day.get("month");
        const year = day.get("year");
        const today = dayjs();
        const isToday =
            date === today.get("date") &&
            month === today.get("month") &&
            year === today.get("year");
        if (isToday) {
            return `${day.format("MMM DD").toUpperCase()} (TODAY)`;
        }

        return day.format("MMM DD").toUpperCase();
    }, [data.createdAt]);

    return (
        <Link
            to={webRoutes.task(data.id)}
            className={cx("flex flex-col items-center gap-[16px]", "group")}
        >
            {!createdAtInline && <Tag>{createdAtString}</Tag>}
            <div
                className={cx(
                    "border-[2px] border-[#27313a]",
                    "rounded-[16px]",
                    "p-[9px] w-full",
                    "transition-all",
                    "hover:scale-[1.05]",
                    "cursor-pointer",
                    {
                        "shadow-task-active": active,
                    }
                )}
            >
                <div className={cx("relative", "pt-[75%]")}>
                    {createdAtInline && (
                        <Tag
                            className={cx(
                                "absolute top-[10px] right-[10px] z-10",
                                "bg-[#000]",
                                "text-[#fff] font-[700]",
                                "transition-all",
                                "group-hover:opacity-0"
                            )}
                        >
                            {createdAtString}
                        </Tag>
                    )}
                    <img
                        src={data.imageUrl}
                        alt=""
                        className={cx(
                            "rounded-[8px]",
                            "absolute top-0 left-0",
                            "w-full h-full"
                        )}
                    />
                </div>
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
                        className={cx("shadow-play-button", {
                            "bg-[#0060ca]": active,
                            "text-[#fff]": active,
                        })}
                    >
                        <Play />
                    </IconButton>
                </div>
            </div>
        </Link>
    );
}

export default TaskItem;
