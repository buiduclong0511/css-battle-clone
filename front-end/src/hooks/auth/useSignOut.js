import axiosClient from "~/api";
import { STORAGE_KEYS } from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import storage from "~/utils/storage";

function useSignOut({ onSuccess = () => {} } = {}) {
    return {
        signOut: async () => {
            try {
                await axiosClient.post(apiRoutes.auth.signOut());
            } finally {
                storage.remove(STORAGE_KEYS.TOKEN);
                storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
                onSuccess();
            }
        },
    };
}

export default useSignOut;
