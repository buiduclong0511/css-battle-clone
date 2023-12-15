import { createBrowserRouter } from "react-router-dom";

import AuthMiddleware from "~/components/AuthMiddleware";
import MainLayout from "~/components/layouts/MainLayout";
import TaskLayout from "~/components/layouts/TaskLayout";
import ConfirmSignInWithEmail from "~/pages/ConfirmSignInWithEmail";
import DailyTarget from "~/pages/DailyTargets";
import HomePage from "~/pages/Home";
import SignInPage from "~/pages/SignIn";
import Task from "~/pages/Task";
import webRoutes from "./webRoutes";

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
            <AuthMiddleware isPrivateRoute>
                <TaskLayout>
                    <Task />
                </TaskLayout>
            </AuthMiddleware>
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
