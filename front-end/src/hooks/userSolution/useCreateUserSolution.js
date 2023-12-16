import { useCallback, useState } from "react";

import axiosClient from "~/api";
import useLoading from "~/provider/LoadingProvider/hook";
import apiRoutes from "~/router/apiRoutes";

function useCreateUserSolution({
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const { showLoading, hideLoading } = useLoading();

    const createUserSolution = useCallback(
        async (body) => {
            showLoading();
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
                hideLoading();
            }
        },
        [hideLoading, onError, onSuccess, showLoading]
    );

    return {
        createUserSolution,
        isLoading,
    };
}

export default useCreateUserSolution;
