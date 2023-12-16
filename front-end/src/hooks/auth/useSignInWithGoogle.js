import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axiosClient from "~/api";
import { STORAGE_KEYS } from "~/constants";
import { app } from "~/firebase";
import apiRoutes from "~/router/apiRoutes";
import webRoutes from "~/router/webRoutes";
import storage from "~/utils/storage";
import useCurrentUser from "./useCurrentUser";

const provider = new GoogleAuthProvider();

function useSignInWithGoogle(props = {}) {
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

    const signInWithGoogle = useCallback(async () => {
        try {
            const { user } = await signInWithPopup(getAuth(app), provider);
            const res = await axiosClient.post(
                apiRoutes.auth.signInWithToken(),
                {
                    token: user.accessToken,
                }
            );

            onSuccess(res);
        } catch (err) {
            onError(err);
        }
    }, [onError, onSuccess]);

    return {
        signInWithGoogle,
    };
}

export default useSignInWithGoogle;
