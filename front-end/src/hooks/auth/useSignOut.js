import STORAGE_KEYS from "~/constants";
import storage from "~/utils/storage";

function useSignOut({ onSuccess = () => {} } = {}) {
    return {
        trigger: () => {
            storage.remove(STORAGE_KEYS.TOKEN);
            onSuccess();
        },
    };
}

export default useSignOut;
