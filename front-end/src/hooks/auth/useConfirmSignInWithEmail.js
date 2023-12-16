import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axiosClient from "~/api";
import STORAGE_KEYS from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import webRoutes from "~/router/webRoutes";
import storage from "~/utils/storage";
import useCurrentUser from "./useCurrentUser";

function useConfirmSignInWithEmail(props = {}) {
    const navigate = useNavigate();
    const { mutate } = useCurrentUser();

    const {
        onSuccess = (response) => {
            storage.set(STORAGE_KEYS.TOKEN, response.accessToken);
            storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
            mutate();
            navigate(webRoutes.home(), { replace: true });
        },
        onError = () => {
            navigate(webRoutes.signIn());
        },
    } = props;

    const confirm = useCallback(
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

    return { confirm };
}

export default useConfirmSignInWithEmail;
