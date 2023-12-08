import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoadingProvider from "./provider/LoadingProvider";
import SWRProvider from "./provider/SWRProvider";
import router from "./router";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <LoadingProvider>
            <SWRProvider>
                <RouterProvider router={router} />
                <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    hideProgressBar
                />
            </SWRProvider>
        </LoadingProvider>
    );
}

export default App;
