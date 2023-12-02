import useSWR from "swr";

import apiRoutes from "~/router/apiRoutes";
import tasks from "~/utils/data";

function useChallengeDetail({ id }) {
    const key = id ? apiRoutes.challenge.show(id) : null;

    return useSWR(key, async () => {
        const task = tasks.find((task) => task.id === Number(id));

        return task;
    });
}

export default useChallengeDetail;
