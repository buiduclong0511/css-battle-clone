import useSWR from "swr";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useTaskDetail(id, { onSuccess = () => {}, onError = () => {} } = {}) {
    const key = id ? apiRoutes.task.show(id) : null;

    return useSWR(
        key,
        async (url) => {
            return (await axiosClient.get(url)).data;
        },
        { onSuccess, onError }
    );
}

export default useTaskDetail;
