import { useMemo } from "react";

import { reverse } from "~/helpers";
import useCurrentUser from "~/hooks/auth/useCurrentUser";
import useTasks from "~/hooks/task/useTasks";
import cx from "~/utils/cx";
import DailyTargets from "./DailyTargets";
import Welcome from "./Welcome";

function HomePage() {
    const { isAuthenticated } = useCurrentUser();

    const { tasks } = useTasks({
        params: {
            limit: 6,
        },
    });

    const reversedTasks = useMemo(() => reverse(tasks), [tasks]);

    return (
        <div>
            {!isAuthenticated && (
                <>
                    <Welcome />
                    <div className={cx("bg-[#27313a]", "h-[1px] my-[48px]")} />
                </>
            )}
            <DailyTargets tasks={reversedTasks} />
        </div>
    );
}

export default HomePage;
