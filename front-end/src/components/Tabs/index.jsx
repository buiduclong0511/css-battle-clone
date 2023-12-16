import { useCallback, useEffect, useRef } from "react";

import { TAB_TYPES } from "~/constants";
import cx from "~/utils/cx";

function Tabs({
    items = [],
    type = TAB_TYPES.CONTAINER,
    activeItem,
    onChange = () => {},
}) {
    const indicator = useRef(null);

    const moveIndicator = useCallback(() => {
        const activeElement = document.querySelector(`#tab-${activeItem}`);
        if (!activeElement || !indicator.current) {
            return;
        }

        indicator.current.style.top = 0;
        indicator.current.style.left = `${activeElement.offsetLeft}px`;
        indicator.current.style.width = `${activeElement.offsetWidth}px`;
    }, [activeItem]);

    useEffect(() => {
        requestIdleCallback(moveIndicator);
    }, [moveIndicator]);

    return (
        <div
            className={cx(
                "bg-tabs",
                "shadow-tabs",
                "p-[8px]",
                "rounded-[16px]",
                "overflow-hidden",
                {
                    "rounded-[999px]": type === TAB_TYPES.OUTLINE,
                    "bg-transparent": type === TAB_TYPES.OUTLINE,
                    "shadow-none": type === TAB_TYPES.OUTLINE,
                    "border border-[#27313a]": type === TAB_TYPES.OUTLINE,
                }
            )}
        >
            <div className={cx("relative", "flex")}>
                <span
                    ref={indicator}
                    className={cx(
                        "absolute top-0 left-0",
                        "transition-all",
                        "rounded-[8px]",
                        "bg-tab-indicator",
                        "shadow-tab-indicator",
                        "w-full h-full",
                        {
                            "rounded-[999px]": type === TAB_TYPES.OUTLINE,
                        }
                    )}
                />
                {items.map((item) => (
                    <span
                        key={item.value}
                        id={`tab-${item.value}`}
                        className={cx(
                            "flex-1 flex justify-center",
                            "px-[24px] py-[4px]",
                            "relative z-10",
                            "cursor-pointer",
                            "whitespace-nowrap",
                            "transition-all",
                            {
                                "text-[#fff]": item.value === activeItem,
                                "text-[14px]": type === TAB_TYPES.OUTLINE,
                            }
                        )}
                        onClick={() => onChange(item)}
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Tabs;
