import axios from "axios";

import config from "~/config";
import STORAGE_KEYS from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import storage from "~/utils/storage";
import errorHandler from "./errorHandler";

const axiosClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        "Content-Type": "Application/json",
    },
});

const handleRefreshToken = async (refreshToken) => {
    try {
        const res = await axios.post(
            `${config.api.baseUrl}${apiRoutes.auth.refreshToken()}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        return res.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

let requestRefreshToken;

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
    async function (error) {
        const status = error.response.status;
        const originalConfig = error.config;

        if (status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN);
            if (!requestRefreshToken) {
                requestRefreshToken = handleRefreshToken(refreshToken);
            }

            try {
                const { accessToken, refreshToken } = await requestRefreshToken;

                storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
                storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
                originalConfig.headers.Authorization = `Bearer ${accessToken}`;

                return axiosClient(originalConfig);
            } catch (err) {
                return Promise.reject(error);
            } finally {
                requestRefreshToken = null;
            }
        }

        errorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosClient;
