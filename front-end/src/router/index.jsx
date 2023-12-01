import { createBrowserRouter } from "react-router-dom";

import MainLayout from "~/components/layouts/MainLayout";
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
]);

export default router;
