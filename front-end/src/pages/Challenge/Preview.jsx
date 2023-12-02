import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef } from "react";

import ChallengeTabHeader from "~/components/ChallengeTabHeader";
import Checkbox from "~/components/Checkbox";
import cx from "~/utils/cx";

function Preview({ task, files = [] }) {
    const overlay = useRef(null);
    const iframe = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const { x } = e.target.getBoundingClientRect();
        const clientX = e.clientX;

        const width = clientX - x < 0 ? 0 : clientX - x;

        overlay.current.style.width = `${width}px`;
        overlay.current.style.borderRight = "1px solid #f00";
        iframe.current.style.opacity = "0.8";
    }, []);

    const handleMouseLeave = useCallback(() => {
        overlay.current.style.width = "400px";
        overlay.current.style.borderRight = "none";
        iframe.current.style.opacity = "1";
    }, []);

    const injectCodeToIframe = useMemo(
        () =>
            debounce((files = []) => {
                if (iframe.current) {
                    const iframeDoc = iframe.current.contentWindow.document;

                    const html = iframeDoc.querySelector("html");
                    const htmlFile = files.find(
                        (file) => file.name === "index.html"
                    );
                    const cssFile = files.find(
                        (file) => file.name === "style.css"
                    );

                    html.innerHTML = htmlFile.value;
                    const styleElement = iframeDoc.createElement("style");
                    styleElement.innerHTML = cssFile.value;
                    html.append(styleElement);
                }
            }, 800),
        []
    );

    useEffect(() => {
        injectCodeToIframe(files);
    }, [files, injectCodeToIframe]);

    return (
        <div>
            <ChallengeTabHeader
                className={cx("flex items-center justify-between")}
            >
                <span>Code output</span>
                <div className={cx("flex items-center gap-[16px]")}>
                    <Checkbox id="slide-and-compare">Slide & Compare</Checkbox>
                    <Checkbox id="diff">Diff</Checkbox>
                </div>
            </ChallengeTabHeader>
            <div className={cx("px-[16px] py-[12px]")}>
                <div
                    className={cx(
                        "w-target h-target",
                        "relative",
                        "cursor-col-resize"
                    )}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        className={cx("absolute top-0 left-0", "w-full h-full")}
                        src={task.image}
                        alt=""
                    />
                    <div
                        ref={overlay}
                        className={cx(
                            "absolute top-0 left-0",
                            "w-full h-full",
                            "overflow-hidden"
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
            </div>
        </div>
    );
}

export default Preview;
