import axios from "axios";

import config from "~/config";
import errorHandler from "./errorHandler";

const axiosClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        "Content-Type": "Application/json",
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        errorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosClient;
