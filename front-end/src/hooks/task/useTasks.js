import useSWR from "swr";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useTasks({
    params = {},
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    return useSWR(
        apiRoutes.task.index(),
        async (url) => {
            return (await axiosClient.get(url, { params })).data;
        },
        { onSuccess, onError }
    );
}

export default useTasks;
