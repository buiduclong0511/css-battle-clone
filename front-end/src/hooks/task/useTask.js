import useSWR from "swr";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useTasks({ onSuccess = () => {}, onError = () => {} } = {}) {
    return useSWR(
        apiRoutes.task.index(),
        async (url) => {
            return (await axiosClient.get(url)).data;
        },
        { onSuccess, onError }
    );
}

export default useTasks;
