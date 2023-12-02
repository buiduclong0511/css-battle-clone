import { createBrowserRouter } from "react-router-dom";

import ChallengeLayout from "~/components/layouts/ChallengeLayout";
import MainLayout from "~/components/layouts/MainLayout";
import Challenge from "~/pages/Challenge";
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
]);

export default router;
