import Achievement from "~/components/icons/Achievement";
import Battle from "~/components/icons/Battle";
import Calendar from "~/components/icons/Calendar";
import Home from "~/components/icons/Home";
import Learn from "~/components/icons/Learn";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";
import SidebarItem from "./SidebarItem";

function Sidebar({ backgroundFill = false }) {
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
            <div
                className={cx(
                    "my-[12px] py-[4px] pl-[32px]",
                    "bg-[#101217]",
                    "text-[14px] font-[500]"
                )}
            >
                PLAY
            </div>
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
        </div>
    );
}

export default Sidebar;
