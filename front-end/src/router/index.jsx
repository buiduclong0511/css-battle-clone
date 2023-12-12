import { createBrowserRouter } from "react-router-dom";

import TaskLayout from "~/components/layouts/TaskLayout";
import MainLayout from "~/components/layouts/MainLayout";
import Task from "~/pages/Task";
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
        path: webRoutes.confirmSignInWithEmail(),
        element: <ConfirmSignInWithEmail />,
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
        path: webRoutes.task(":id"),
        element: (
            <TaskLayout>
                <Task />
            </TaskLayout>
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
]);

export default router;
