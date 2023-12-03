import { useState } from "react";
import ChallengeItem from "~/components/ChallengeItem";
import Tabs from "~/components/Tabs";
import cx from "~/utils/cx";
import tasks from "~/utils/data";

const tabItems = [
    {
        label: "All targets",
        value: "all_targets",
    },
    {
        label: "Not played",
        value: "not_played",
    },
    {
        label: "Played",
        value: "played",
    },
];

function PreviousTargetList() {
    const [activeItem, setActiveItem] = useState("all_targets");

    return (
        <div className={cx("mt-[40px]")}>
            <div
                className={cx(
                    "flex items-center justify-between gap-[30px]",
                    "w-full"
                )}
            >
                <div className={cx("flex-1")}>
                    <h2 className={cx("text-[20px] text-[#fff] font-[700]")}>
                        Previous targets
                    </h2>
                    <p>
                        Want more? Play the previously released targets. You can
                        also view the top solutions of all previous targets
                    </p>
                </div>
                <Tabs
                    items={tabItems}
                    activeItem={activeItem}
                    onChange={(item) => setActiveItem(item.value)}
                />
            </div>

            <div className={cx("grid grid-cols-5 gap-[32px]", "mt-[32px]")}>
                {tasks.map((task) => (
                    <ChallengeItem key={task.id} data={task} createdAtInline />
                ))}
            </div>
        </div>
    );
}

export default PreviousTargetList;
