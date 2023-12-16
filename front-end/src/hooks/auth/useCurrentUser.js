import { useMemo } from "react";
import useSWR from "swr";

import axiosClient from "~/api";
import STORAGE_KEYS from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import storage from "~/utils/storage";

function useCurrentUser({ onSuccess = () => {}, onError = () => {} } = {}) {
    const key = apiRoutes.auth.getCurrentUser();

    const { data, isLoading, mutate } = useSWR(
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

    const isAuthenticated = useMemo(() => {
        const token = storage.get(STORAGE_KEYS.TOKEN);
        if (!token) {
            return false;
        }

        return isLoading || (!isLoading && !!data);
    }, [data, isLoading]);


    return {
        currentUser: data,
        isLoading,
        mutate,
        isAuthenticated,
    };
}

export default useCurrentUser;
