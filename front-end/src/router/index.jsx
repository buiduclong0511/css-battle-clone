import { createBrowserRouter } from "react-router-dom";

import MainLayout from "~/components/layouts/MainLayout";
import Challenge from "~/pages/Challenge";
import HomePage from "~/pages/Home";
import SignInPage from "~/pages/SignIn";
import paths from "./paths";

const router = createBrowserRouter([
    {
        path: paths.auth.signIn,
        element: (
            <MainLayout>
                <SignInPage />
            </MainLayout>
        ),
    },
    {
        path: paths.public.home,
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: paths.public.challenge,
        element: (
            <MainLayout>
                <Challenge />
            </MainLayout>
        ),
    },
]);

export default router;
