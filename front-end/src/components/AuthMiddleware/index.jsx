import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCurrentUser from "~/hooks/auth/useCurrentUser";
import webRoutes from "~/router/webRoutes";

function AuthMiddleware({
    children,
    isPrivateRoute = false,
    isAuthRoute = false,
}) {
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const navigate = useNavigate();

    const { isAuthenticated } = useCurrentUser();

    useEffect(() => {
        if (!isAuthenticated && isPrivateRoute) {
            navigate(webRoutes.signIn(), { replace: true });
        } else if (isAuthenticated && isAuthRoute) {
            navigate(webRoutes.home(), { replace: true });
        }
        setIsAuthenticating(false);
    }, [isAuthRoute, isAuthenticated, isPrivateRoute, navigate]);

    if (isAuthenticating) {
        return null;
    }

    return children;
}

export default AuthMiddleware;
