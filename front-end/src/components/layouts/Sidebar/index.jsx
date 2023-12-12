import Achievement from "~/components/icons/Achievement";
import Battle from "~/components/icons/Battle";
import Calendar from "~/components/icons/Calendar";
import Chart from "~/components/icons/Chart";
import Home from "~/components/icons/Home";
import Learn from "~/components/icons/Learn";
import Settings from "~/components/icons/Settings";
import User from "~/components/icons/User";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";
import SidebarItem from "./SidebarItem";
import useCurrentUser from "~/hooks/auth/useCurrentUser";

function Label({ children }) {
    return (
        <div
            className={cx(
                "my-[12px] mt-[24px] py-[4px] pl-[32px]",
                "bg-[#101217]",
                "opacity-50",
                "text-[14px] font-[500]",
                "flex items-center"
            )}
        >
            {children}
        </div>
    );
}

function Sidebar({ backgroundFill = false }) {
    const { isAuthenticated } = useCurrentUser();

    return (
        <div
            className={cx(
                "w-sidebar h-[calc(100vh-60px)] pt-[16px]",
                "border-r border-r-[#20262e]",

                {
                    "bg-sidebar-transparent": !backgroundFill,
                    "bg-sidebar": backgroundFill,
                }
            )}
        >
            <SidebarItem icon={<Home />} title="Home" href={webRoutes.home()} />
            <Label>PLAY</Label>
            <SidebarItem
                icon={<Calendar />}
                title="Daily targets"
                badge="new"
                href={webRoutes.dailyTargets()}
            />
            <SidebarItem
                icon={<Battle />}
                title="Battles"
                badge="1 upcoming"
                href={webRoutes.battles()}
            />
            <SidebarItem
                icon={<Achievement />}
                title="Leaderboard"
                href={webRoutes.leaderBoard()}
            />
            <SidebarItem
                icon={<Learn />}
                title="Learn CSS"
                href={webRoutes.learnCss()}
            />
            {isAuthenticated && (
                <>
                    <Label>FOR YOU</Label>
                    <SidebarItem
                        icon={<User />}
                        title="Profile"
                        href={webRoutes.profile()}
                    />
                    <SidebarItem
                        icon={<Chart />}
                        title="Stats"
                        href={webRoutes.stats()}
                    />
                    <SidebarItem
                        icon={<Settings />}
                        title="Settings"
                        href={webRoutes.settings()}
                    />
                </>
            )}
        </div>
    );
}

export default Sidebar;
