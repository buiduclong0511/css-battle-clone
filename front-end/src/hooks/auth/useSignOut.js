import STORAGE_KEYS from "~/constants";
import storage from "~/utils/storage";

function useSignOut({ onSuccess = () => {} } = {}) {
    return {
        signOut: () => {
            storage.remove(STORAGE_KEYS.TOKEN);
            onSuccess();
        },
    };
}

export default useSignOut;
