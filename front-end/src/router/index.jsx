import { createBrowserRouter } from "react-router-dom";

import HomePage from "~/pages/Home";
import paths from "./paths";
import MainLayout from "~/components/layouts/MainLayout";

const router = createBrowserRouter([
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
