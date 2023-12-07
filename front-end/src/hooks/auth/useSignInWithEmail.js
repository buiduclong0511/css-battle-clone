import { useCallback, useState } from "react";

import axiosClient from "~/api";
import useLoading from "~/provider/LoadingProvider/hook";
import apiRoutes from "~/router/apiRoutes";

function useSignInWithEmail({ onSuccess = () => {}, onError = () => {} } = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const { showLoading, hideLoading } = useLoading();

    const signInWithEmail = useCallback(
        async (email) => {
            try {
                setIsLoading(true);
                showLoading();
                const res = await axiosClient.post(
                    apiRoutes.auth.signInWithEmail(),
                    {
                        email,
                    }
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
        trigger: signInWithEmail,
        isLoading,
    };
}

export default useSignInWithEmail;
