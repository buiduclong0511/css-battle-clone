import { createContext, useMemo, useState } from "react";

import Spinner from "~/components/icons/Spinner";
import cx from "~/utils/cx";

export const LoadingContext = createContext();

function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const value = useMemo(
        () => ({
            showLoading: () => setIsLoading(true),
            hideLoading: () => setIsLoading(false),
        }),
        []
    );

    return (
        <LoadingContext.Provider value={value}>
            <span
                className={cx(
                    "fixed z-40 top-[50px] left-1/2",
                    "-translate-x-1/2 scale-50",
                    "bg-[#222]",
                    "shadow-2xl",
                    "rounded-full",
                    "transition-all",
                    "duration-[500ms]",
                    { "-top-[1000px] opacity-0": !isLoading }
                )}
            >
                <Spinner />
            </span>
            {children}
        </LoadingContext.Provider>
    );
}

export default LoadingProvider;
