import { reverse } from "lodash";
import { useMemo } from "react";

import useTasks from "~/hooks/task/useTasks";
import DailyTargetList from "./DailyTargetList";
import PreviousTargetList from "./PreviousTargetList";

function DailyTarget() {
    const { tasks: dailyTasks } = useTasks({ params: { limit: 2 } });
    const { tasks: previousTasks } = useTasks({ params: { limit: 30 } });

    const reversedDailyTasks = useMemo(() => reverse(dailyTasks), [dailyTasks]);
    const reversedPreviousTasks = useMemo(
        () =>
            previousTasks.filter(({ id }) => {
                return !dailyTasks.some((task) => task.id === id);
            }),
        [dailyTasks, previousTasks]
    );

    return (
        <div>
            <DailyTargetList tasks={reversedDailyTasks} />
            <PreviousTargetList tasks={reversedPreviousTasks} />
        </div>
    );
}

export default DailyTarget;
