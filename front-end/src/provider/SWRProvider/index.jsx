import { SWRConfig } from "swr";

import STORAGE_KEYS from "~/constants";
import apiRoutes from "~/router/apiRoutes";
import storage from "~/utils/storage";

// All keys was persisted in localStorage
const whitelist = [apiRoutes.auth.getCurrentUser()];

function localStorageProvider() {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(storage.get(STORAGE_KEYS.APP_CACHE) ?? []);

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener("beforeunload", () => {
        const appCache = Array.from(map.entries()).filter(([key]) =>
            whitelist.includes(key)
        );
        storage.set(STORAGE_KEYS.APP_CACHE, appCache);
    });

    // We still use the map for write & read for performance.
    return map;
}

function SWRProvider({ children }) {
    return (
        <SWRConfig
            value={{ provider: localStorageProvider, revalidateOnFocus: false }}
        >
            {children}
        </SWRConfig>
    );
}

export default SWRProvider;
