import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useConfirmSignInWithEmail from "~/hooks/auth/useConfirmSignInWithEmail";
import useQuery from "~/hooks/useQuery";
import webRoutes from "~/router/webRoutes";

function ConfirmSignInWithEmail() {
    const query = useQuery();
    const navigate = useNavigate();

    const token = query.get("token");
    const email = query.get("email");

    const { trigger: confirm } = useConfirmSignInWithEmail({
        onError: () => navigate(webRoutes.auth.signIn()),
        onSuccess: console.log,
    });

    useEffect(() => {
        if (!token || !email) {
            navigate(webRoutes.auth.signIn());
            return;
        }

        confirm({ email, token });
    }, [confirm, email, navigate, token]);

    return null;
}

export default ConfirmSignInWithEmail;
