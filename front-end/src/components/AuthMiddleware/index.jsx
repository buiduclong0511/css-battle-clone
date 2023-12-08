import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useCurrentUser from "~/hooks/auth/useCurrentUser";
import webRoutes from "~/router/webRoutes";

function AuthMiddleware({
    children,
    isPrivateRoute = false,
    isAuthRoute = false,
}) {
    const navigate = useNavigate();

    const { data: currentUser, isLoading } = useCurrentUser();

    const isAuthenticated = useMemo(
        () => currentUser && !isLoading,
        [currentUser, isLoading]
    );

    useEffect(() => {
        if (!isAuthenticated && isPrivateRoute) {
            navigate(webRoutes.signIn());
        } else if (isAuthenticated && isAuthRoute) {
            navigate(webRoutes.home());
        }
    }, [isAuthRoute, isAuthenticated, isPrivateRoute, navigate]);

    return children;
}

export default AuthMiddleware;
