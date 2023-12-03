import { useCallback, useEffect, useRef } from "react";
import cx from "~/utils/cx";

function Tabs({ items = [], activeItem, onChange = () => {} }) {
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
                "overflow-hidden"
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
                        "w-full h-full"
                    )}
                />
                {items.map((item) => (
                    <span
                        key={item.value}
                        id={`tab-${item.value}`}
                        className={cx(
                            "inline-block px-[24px] py-[4px]",
                            "relative z-10",
                            "cursor-pointer",
                            "whitespace-nowrap",
                            "transition-all",
                            { "text-[#fff]": item.value === activeItem }
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
