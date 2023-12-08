import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useCallback } from "react";

import axiosClient from "~/api";
import { app } from "~/firebase";
import apiRoutes from "~/router/apiRoutes";

const provider = new GoogleAuthProvider();

function useSignInWithGoogle({
    onSuccess = () => {},
    onError = () => {},
} = {}) {
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
        trigger: signInWithGoogle,
    };
}

export default useSignInWithGoogle;
