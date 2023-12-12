import useSWR from "swr";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useTasks({
    params = {},
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const { data } = useSWR(
        [apiRoutes.task.index(), params],
        async ([url, params]) => {
            return (await axiosClient.get(url, { params })).data;
        },
        { onSuccess, onError }
    );

    return { tasks: data ?? [] };
}

export default useTasks;
