import { useCallback, useState } from "react";
import { IconButton } from "~/components/Button";
import Bar from "~/components/icons/Bar";
import cx from "~/utils/cx";
import Sidebar from "../Sidebar";

function ChallengeSidebar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = useCallback(
        () => setShowSidebar((prev) => !prev),
        []
    );

    return (
        <div>
            <IconButton onClick={toggleSidebar}>
                <Bar />
            </IconButton>
            <div
                className={cx(
                    "fixed top-[60px] left-0",
                    "w-screen h-screen",
                    "bg-[rgba(0,0,0,.2)]",
                    "transition-all",
                    {
                        "opacity-0 invisible": !showSidebar,
                    }
                )}
                onClick={toggleSidebar}
            />
            <div
                className={cx(
                    "fixed top-[60px] -left-[500px]",
                    "transition-all",
                    {
                        "left-0": showSidebar,
                    }
                )}
            >
                <Sidebar backgroundFill />
            </div>
        </div>
    );
}

export default ChallengeSidebar;
