import axios from "axios";
import { jwtDecode } from "jwt-decode";

import config from "~/config";
import { STORAGE_KEYS } from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import storage from "~/utils/storage";
import errorHandler from "./errorHandler";
import dayjs from "dayjs";

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
        return { accessToken: null, refreshToken: null };
    }
};

let requestRefreshToken;

axiosClient.interceptors.request.use(
    async function (config) {
        let token = storage.get(STORAGE_KEYS.TOKEN);
        try {
            if (token) {
                const { exp } = jwtDecode(token);
                const isExpired = dayjs().isAfter(dayjs(exp * 1000));

                const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN);
                if (isExpired && refreshToken) {
                    if (!requestRefreshToken) {
                        requestRefreshToken = handleRefreshToken(refreshToken);
                    }

                    const {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    } = await requestRefreshToken;
                    token = newAccessToken;
                    storage.set(STORAGE_KEYS.TOKEN, newAccessToken);
                    storage.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
                }

                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (err) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
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
        errorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosClient;
