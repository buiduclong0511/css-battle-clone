import { createBrowserRouter } from "react-router-dom";

import ChallengeLayout from "~/components/layouts/ChallengeLayout";
import MainLayout from "~/components/layouts/MainLayout";
import Challenge from "~/pages/Challenge";
import ConfirmSignInWithEmail from "~/pages/ConfirmSignInWithEmail";
import DailyTarget from "~/pages/DailyTargets";
import HomePage from "~/pages/Home";
import SignInPage from "~/pages/SignIn";
import webRoutes from "./webRoutes";
import AuthMiddleware from "~/components/AuthMiddleware";

const router = createBrowserRouter([
    {
        path: webRoutes.signIn(),
        element: (
            <AuthMiddleware isAuthRoute>
                <MainLayout>
                    <SignInPage />
                </MainLayout>
            </AuthMiddleware>
        ),
    },
    {
        path: webRoutes.home(),
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: webRoutes.challenge(":id"),
        element: (
            <ChallengeLayout>
                <Challenge />
            </ChallengeLayout>
        ),
    },
    {
        path: webRoutes.dailyTargets(),
        element: (
            <MainLayout>
                <DailyTarget />
            </MainLayout>
        ),
    },
    {
        path: webRoutes.confirmSignInWithEmail(),
        element: <ConfirmSignInWithEmail />,
    },
]);

export default router;
