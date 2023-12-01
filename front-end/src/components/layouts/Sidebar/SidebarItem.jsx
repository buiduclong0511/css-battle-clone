import { NavLink } from "react-router-dom";
import cx from "~/utils/cx";

import "./style.css";

function SidebarItem({
    icon = null,
    active = false,
    title = "",
    href = "",
    badge = "",
}) {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                cx(
                    "group sidebar-item",
                    "flex items-center gap-[8px]",
                    "px-[16px] py-[8px] ml-[16px]",
                    "rounded-tl-[999px] rounded-bl-[999px]",
                    { "bg-sidebar-item-active is-active": isActive }
                )
            }
        >
            <span
                className={cx(
                    "sidebar-item-icon",
                    "flex justify-center",
                    "w-[20px]",
                    "group-hover:translate-x-[-3px]",
                    "text-[#6b7b8e]",
                    "group-hover:text-[#a0b3c6]",
                    "transition-all",
                    { "text-[#a0b3c6]": active }
                )}
            >
                {icon}
            </span>
            <span
                className={cx(
                    "sidebar-item-text",
                    "group-hover:text-[#eff5fb]",
                    "transition-all",
                    {
                        "text-[#eff5fb]": active,
                    }
                )}
            >
                {title}
            </span>
            {!!badge && (
                <span
                    className={cx(
                        "bg-[rgba(255,223,0,0.15)]",
                        "text-[rgb(255,223,0)] text-[11px] uppercase",
                        "shadow-sidebar-item-badge",
                        "inline-block px-[6px] py-[1px]",
                        "rounded-[4px]",
                        "whitespace-nowrap"
                    )}
                >
                    {badge}
                </span>
            )}
        </NavLink>
    );
}

export default SidebarItem;
