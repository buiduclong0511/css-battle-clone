import { createBrowserRouter } from "react-router-dom";

import ChallengeLayout from "~/components/layouts/ChallengeLayout";
import MainLayout from "~/components/layouts/MainLayout";
import Challenge from "~/pages/Challenge";
import ConfirmSignInWithEmail from "~/pages/ConfirmSignInWithEmail";
import DailyTarget from "~/pages/DailyTargets";
import HomePage from "~/pages/Home";
import SignInPage from "~/pages/SignIn";
import webRoutes from "./webRoutes";

const router = createBrowserRouter([
    {
        path: webRoutes.auth.signIn(),
        element: (
            <MainLayout>
                <SignInPage />
            </MainLayout>
        ),
    },
    {
        path: webRoutes.public.home(),
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: webRoutes.public.challenge(":id"),
        element: (
            <ChallengeLayout>
                <Challenge />
            </ChallengeLayout>
        ),
    },
    {
        path: webRoutes.public.dailyTargets(),
        element: (
            <MainLayout>
                <DailyTarget />
            </MainLayout>
        ),
    },
    {
        path: webRoutes.auth.confirmSignInWithEmail(),
        element: <ConfirmSignInWithEmail />,
    },
]);

export default router;
