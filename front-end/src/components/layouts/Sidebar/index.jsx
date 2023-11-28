import Achievement from "~/components/icons/Achievement";
import Battle from "~/components/icons/Battle";
import Calendar from "~/components/icons/Calendar";
import Home from "~/components/icons/Home";
import Learn from "~/components/icons/Learn";
import paths from "~/router/paths";
import cx from "~/utils/cx";
import SidebarItem from "./SidebarItem";

function Sidebar() {
    return (
        <div
            className={cx(
                "fixed top-[60px] left-0",
                "w-sidebar h-[calc(100vh-60px)] pt-[16px]",
                "border-r border-r-sidebar",
                "bg-sidebar"
            )}
        >
            <SidebarItem
                icon={<Home />}
                title="Home"
                href={paths.public.home}
            />
            <div
                className={cx(
                    "my-[12px] py-[4px] pl-[32px]",
                    "bg-section-heading",
                    "text-[14px] font-[500]"
                )}
            >
                PLAY
            </div>
            <SidebarItem
                icon={<Calendar />}
                title="Daily targets"
                badge="new"
                href={paths.public.dailyTargets}
            />
            <SidebarItem
                icon={<Battle />}
                title="Battles"
                badge="1 upcoming"
                href={paths.public.battles}
            />
            <SidebarItem
                icon={<Achievement />}
                title="Leaderboard"
                href={paths.public.leaderBoard}
            />
            <SidebarItem
                icon={<Learn />}
                title="Learn CSS"
                href={paths.public.learnCss}
            />
        </div>
    );
}

export default Sidebar;
