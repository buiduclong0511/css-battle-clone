import { isNumber } from "lodash";
import { useCallback, useMemo, useState } from "react";

import Tabs from "~/components/Tabs";
import Character from "~/components/icons/Character";
import Chart from "~/components/icons/Chart";
import Lightning from "~/components/icons/Lightning";
import Star from "~/components/icons/Star";
import UserCircle from "~/components/icons/UserCircle";
import { TAB_TYPES } from "~/constants";
import cx from "~/utils/cx";

const tabItems = [
    {
        label: "Your stats",
        value: "your_stats",
    },
    {
        label: "Global stats",
        value: "global_stats",
    },
];

function YourStatsItem({ icon, label, value }) {
    return (
        <div
            className={cx(
                "relative",
                "flex-1 flex flex-col items-center gap-[4px]",
                "p-[12px]",
                "border-[2px] border-[#27313a]",
                "rounded-[16px]",
                "animate-fade-up"
            )}
        >
            <span
                className={cx(
                    "absolute bottom-full",
                    "translate-y-1/2",
                    "bg-[#121518] px-[12px]"
                )}
            >
                {icon}
            </span>
            <span className={cx("text-[#eff5fb] text-[18px] font-[700]")}>
                {value}
            </span>
            <span className={cx("text-[#6b7b8e] text-[14px]")}>{label}</span>
        </div>
    );
}

function GlobalStatsItem({ icon, label, value }) {
    return (
        <div
            className={cx(
                "flex-auto flex gap-[16px] items-center",
                "rounded-[999px]",
                "border-[2px] border-[#27313a]",
                "p-[12px]",
                "text-[rgb(160,179,198)]",
                "animate-fade-up"
            )}
        >
            <span
                className={cx(
                    "flex items-center justify-center",
                    "w-[40px] h-[40px]",
                    "bg-[#27313a]",
                    "rounded-full"
                )}
            >
                {icon}
            </span>
            <div
                className={cx(
                    "flex flex-col justify-around",
                    "text-[16px] font-[500]"
                )}
            >
                <span>{label}</span>
                <span className={cx("text-[#ffdf00]")}>{value}</span>
            </div>
        </div>
    );
}

function TaskStatistic({ task }) {
    const [activeItem, setActiveItem] = useState("your_stats");

    const getNumberValue = useCallback(
        (value, cb = (value) => value) => (isNumber(value) ? cb(value) : "-"),
        []
    );

    const tab = useMemo(
        () => ({
            your_stats: (
                <div className={cx("flex gap-[8px]")}>
                    <YourStatsItem
                        icon={<Star />}
                        label="Last score"
                        value={getNumberValue(task.myBestSolution?.scores)}
                    />
                    <YourStatsItem
                        icon={<Lightning />}
                        label="Hight score"
                        value={getNumberValue(task.bestSolution?.scores)}
                    />
                </div>
            ),
            global_stats: (
                <div className={cx("flex flex-col gap-[8px]")}>
                    <div className={cx("flex gap-[8px]")}>
                        <GlobalStatsItem
                            icon={<UserCircle />}
                            label="Players"
                            value={getNumberValue(task.playedUsersCount)}
                        />
                        <GlobalStatsItem
                            icon={<Chart width="1.5rem" height="1.5rem" />}
                            label="Success rate"
                            value={getNumberValue(
                                task.successRate,
                                (value) => `${value}%`
                            )}
                        />
                    </div>
                    <div className={cx("flex gap-[8px]")}>
                        <GlobalStatsItem
                            icon={
                                <Star
                                    width="1.5rem"
                                    height="1.5rem"
                                    fill="currentColor"
                                />
                            }
                            label="Avg. score"
                            value={getNumberValue(task.avgScores, (value) =>
                                value.toFixed(2)
                            )}
                        />
                        <GlobalStatsItem
                            icon={<Character />}
                            label="Avg. chars"
                            value={getNumberValue(
                                task.avgCharactersCount,
                                Math.round
                            )}
                        />
                    </div>
                </div>
            ),
        }),
        [
            getNumberValue,
            task.avgCharactersCount,
            task.avgScores,
            task.bestSolution?.scores,
            task.myBestSolution?.scores,
            task.playedUsersCount,
            task.successRate,
        ]
    );

    return (
        <div>
            <Tabs
                items={tabItems}
                activeItem={activeItem}
                type={TAB_TYPES.OUTLINE}
                onChange={(item) => setActiveItem(item.value)}
            />
            <div className={cx("mt-[16px]")}>{tab[activeItem]}</div>
        </div>
    );
}

export default TaskStatistic;
