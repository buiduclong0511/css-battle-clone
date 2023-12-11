import { useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import ChallengeTabHeader from "~/components/ChallengeTabHeader";
import cx from "~/utils/cx";

function ColorItem({ color }) {
    const handleCopy = useCallback(
        () => toast.info(`Color ${color} copied to clipboard!`),
        [color]
    );

    return (
        <CopyToClipboard text={color} onCopy={handleCopy}>
            <div
                className={cx(
                    "group",
                    "bg-[rgb(45,55,64)]",
                    "p-[8px]",
                    "rounded-[999px]",
                    "flex items-center gap-[8px]",
                    "cursor-pointer"
                )}
            >
                <span
                    style={{ backgroundColor: color }}
                    className={cx(
                        "transition-all",
                        "inline-block w-[19px] h-[19px]",
                        "origin-center",
                        "group-hover:scale-[1.2]",
                        "shadow-color-preview",
                        "rounded-full"
                    )}
                />
                <span>{color}</span>
            </div>
        </CopyToClipboard>
    );
}

function Target({ task }) {
    return (
        <div>
            <ChallengeTabHeader
                className={cx("flex items-center justify-between")}
            >
                <span>Recreate this target</span>
                <span>400px x 300px</span>
            </ChallengeTabHeader>
            <div className={cx("px-[16px] py-[12px]")}>
                <img src={task.imageUrl} className={cx("w-target h-target")} />
            </div>
            <div>
                <div className={cx("pl-[12px]", "flex items-center gap-[8px]")}>
                    <span className={cx("font-[600]")}>Colors</span>
                    <span
                        className={cx(
                            "inline-block h-[1px]",
                            "flex-1",
                            "bg-[#27313a]"
                        )}
                    />
                </div>
                <div className={cx("grid grid-cols-3 gap-[8px]", "p-[12px]")}>
                    {task.colorArray.map((color) => (
                        <ColorItem key={color} color={color.toUpperCase()} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Target;
