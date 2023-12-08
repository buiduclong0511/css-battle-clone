import axios from "axios";

import config from "~/config";
import STORAGE_KEYS from "~/constants";
import storage from "~/utils/storage";
import errorHandler from "./errorHandler";

const axiosClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        "Content-Type": "Application/json",
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        const token = storage.get(STORAGE_KEYS.TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

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
