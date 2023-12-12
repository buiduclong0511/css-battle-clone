import { useClickAway } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";

import Avatar from "~/components/Avatar";
import Button from "~/components/Button";
import ArrowDown from "~/components/icons/ArrowDown";
import useCurrentUser from "~/hooks/auth/useCurrentUser";
import useSignOut from "~/hooks/auth/useSignOut";
import cx from "~/utils/cx";

function UserMenu() {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const { currentUser, mutate } = useCurrentUser();
    const { signOut } = useSignOut({
        onSuccess: () => {
            mutate();
        },
    });

    const ref = useClickAway(() => {
        setIsShowMenu(false);
    });

    const toggleMenu = useCallback(
        () =>
            requestIdleCallback(() => {
                setIsShowMenu((prev) => !prev);
            }),
        []
    );

    return (
        <div className={cx("relative")} ref={ref}>
            <Button onClick={toggleMenu}>
                <Avatar src={currentUser.avatar} />
                <span
                    className={cx(
                        "inline-block max-w-[50px] ml-[4px]",
                        "text-ellipsis overflow-hidden"
                    )}
                >
                    {currentUser.displayName}
                </span>
                <span className={cx("ml-[8px]")}>
                    <ArrowDown />
                </span>
            </Button>
            {isShowMenu && (
                <div
                    className={cx(
                        "absolute top-[calc(100%+4px)] left-1/2",
                        "w-full py-[8px]",
                        "rounded-[6px]",
                        "-translate-x-1/2",
                        "bg-[#27313a]",
                        "shadow-[0_10px_80px_rgba(0,0,0,.75)]"
                    )}
                    onClick={toggleMenu}
                >
                    <div
                        className={cx("cursor-pointer", "px-[20px]")}
                        onClick={signOut}
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
