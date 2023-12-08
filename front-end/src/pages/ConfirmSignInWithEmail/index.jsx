import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import STORAGE_KEYS from "~/constants";
import useConfirmSignInWithEmail from "~/hooks/auth/useConfirmSignInWithEmail";
import useQuery from "~/hooks/useQuery";
import webRoutes from "~/router/webRoutes";
import storage from "~/utils/storage";

function ConfirmSignInWithEmail() {
    const query = useQuery();
    const navigate = useNavigate();

    const token = query.get("token");
    const email = query.get("email");

    const { trigger: confirm } = useConfirmSignInWithEmail({
        onSuccess: (response) => {
            storage.set(STORAGE_KEYS.TOKEN, response.accessToken);
            navigate(webRoutes.home(), { replace: true });
        },
        onError: () => {
            navigate(webRoutes.signIn());
        },
    });

    useEffect(() => {
        if (!token || !email) {
            navigate(webRoutes.signIn());
            return;
        }

        confirm({ email, token });
    }, [confirm, email, navigate, token]);

    return null;
}

export default ConfirmSignInWithEmail;
