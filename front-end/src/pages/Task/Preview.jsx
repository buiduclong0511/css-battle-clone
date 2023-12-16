import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import TaskTabHeader from "~/components/TaskTabHeader";
import Checkbox from "~/components/Checkbox";
import cx from "~/utils/cx";
import TaskStatistic from "./TaskStatistic";

function Preview({ task, files = [] }) {
    const [isSlideCompare, setIsSlideCompare] = useState(true);
    const [isDiff, setIsDiff] = useState(false);

    const overlay = useRef(null);
    const iframe = useRef(null);

    const firstTime = useRef(true);

    const handleMouseMove = useCallback(
        (e) => {
            if (!isSlideCompare) {
                return;
            }

            const { x } = e.target.getBoundingClientRect();
            const clientX = e.clientX;

            const width = clientX - x < 0 ? 0 : clientX - x;

            overlay.current.style.width = `${width}px`;
            overlay.current.style.borderRight = "1px solid #f00";
            iframe.current.style.opacity = "0.8";
        },
        [isSlideCompare]
    );

    const handleMouseLeave = useCallback(() => {
        if (!isSlideCompare) {
            return;
        }

        overlay.current.style.width = "400px";
        overlay.current.style.borderRight = "none";
        iframe.current.style.opacity = "1";
    }, [isSlideCompare]);

    const injectCodeToIframe = useCallback((files = []) => {
        if (iframe.current) {
            const iframeDoc = iframe.current.contentWindow.document;

            const html = iframeDoc.querySelector("html");
            const htmlFile = files.find((file) => file.name === "index.html");
            const cssFile = files.find((file) => file.name === "style.css");

            html.innerHTML = htmlFile.value;
            const styleElement = iframeDoc.createElement("style");
            styleElement.innerHTML = cssFile.value;
            html.append(styleElement);
        }
    }, []);

    const debouncedInjectCodeToIframe = useMemo(
        () => debounce(injectCodeToIframe, 500),
        [injectCodeToIframe]
    );

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false;
            injectCodeToIframe(files);
        }
    }, [files, injectCodeToIframe]);

    useEffect(() => {
        debouncedInjectCodeToIframe(files);
    }, [debouncedInjectCodeToIframe, files]);

    return (
        <div>
            <TaskTabHeader className={cx("flex items-center justify-between")}>
                <span>Code output</span>
                <div className={cx("flex items-center gap-[16px]")}>
                    <Checkbox
                        checked={isSlideCompare}
                        onChange={() => setIsSlideCompare(!isSlideCompare)}
                        id="slide-and-compare"
                    >
                        Slide & Compare
                    </Checkbox>
                    <Checkbox
                        checked={isDiff}
                        onChange={() => setIsDiff(!isDiff)}
                        id="diff"
                    >
                        Diff
                    </Checkbox>
                </div>
            </TaskTabHeader>
            <div className={cx("px-[16px] py-[12px]")}>
                <div
                    className={cx("w-target h-target", "relative", {
                        "cursor-col-resize": isSlideCompare,
                    })}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        className={cx("absolute top-0 left-0", "w-full h-full")}
                        src={task.imageUrl}
                        alt=""
                    />
                    <div
                        ref={overlay}
                        className={cx(
                            "absolute top-0 left-0",
                            "w-full h-full",
                            "overflow-hidden",
                            {
                                "mix-blend-difference": isDiff,
                            }
                        )}
                    >
                        <div
                            className={cx(
                                "absolute top-0 left-0 z-10",
                                "w-full h-full"
                            )}
                        />
                        <iframe
                            ref={iframe}
                            className={cx(
                                "w-target h-target",
                                "absolute",
                                "bg-[#fff]"
                            )}
                            title="Preview"
                        />
                    </div>
                </div>
                <div className={cx("mt-[32px]")}>
                    <TaskStatistic task={task} />
                </div>
            </div>
        </div>
    );
}

export default Preview;
