import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";

import LoadingProvider from "./provider/LoadingProvider";
import router from "./router";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <LoadingProvider>
            <SWRConfig>
                <RouterProvider router={router} />
                <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    hideProgressBar
                />
            </SWRConfig>
        </LoadingProvider>
    );
}

export default App;
