import { useCallback } from "react";

import axiosClient from "~/api";
import apiRoutes from "~/router/apiRoutes";

function useConfirmSignInWithEmail({
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const trigger = useCallback(
        async ({ email, token }) => {
            try {
                const res = await axiosClient.post(
                    apiRoutes.auth.confirmSignInWithEmail(),
                    {
                        email,
                        token,
                    }
                );
                onSuccess(res);
            } catch (err) {
                onError(err);
            }
        },
        [onError, onSuccess]
    );

    return { trigger };
}

export default useConfirmSignInWithEmail;
