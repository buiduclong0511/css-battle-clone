import { useCallback, useState } from "react";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useCreateUserSolution({
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const [isLoading, setIsLoading] = useState(false);

    const createUserSolution = useCallback(
        async (body) => {
            setIsLoading(true);
            try {
                const res = await axiosClient.post(
                    apiRoutes.userSolution.create(),
                    body
                );
                onSuccess(res);
            } catch (err) {
                onError(err);
            } finally {
                setIsLoading(false);
            }
        },
        [onError, onSuccess]
    );

    return {
        createUserSolution,
        isLoading,
    };
}

export default useCreateUserSolution;
