import useSWR from "swr";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useCurrentUser({ onSuccess = () => {}, onError = () => {} } = {}) {
    const key = apiRoutes.auth.getCurrentUser();

    return useSWR(
        key,
        async (url) => {
            try {
                const response = await axiosClient.get(url);
                onSuccess(response.data);
                return response.data;
            } catch (err) {
                onError(err);
                return null;
            }
        },
        {
            refreshInterval: false,
        }
    );
}

export default useCurrentUser;
