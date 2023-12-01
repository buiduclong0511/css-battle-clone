import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import cx from "~/utils/cx";

const TimeBlock = ({ children }) => {
    return (
        <span
            className={cx(
                "w-[22px] h-[27px]",
                "inline-flex items-center justify-center",
                "bg-[rgba(39,45,52)]",
                "rounded-[8px]",
                "shadow-time-block"
            )}
        >
            {children}
        </span>
    );
};

function CountDown({ to = null }) {
    const getDiffTime = useCallback(
        () => dayjs(to).diff(dayjs(), "seconds"),
        [to]
    );
    const [diffInSeconds, setDiffInSeconds] = useState(getDiffTime());

    const hours = Math.floor(diffInSeconds / 60 / 60);
    const minutes = Math.floor((diffInSeconds - hours * 3600) / 60);
    const seconds = diffInSeconds - hours * 3600 - minutes * 60;

    useEffect(() => {
        const timer = setInterval(() => {
            setDiffInSeconds(getDiffTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [getDiffTime, to]);

    return (
        <div className={cx("flex gap-[4px]")}>
            <TimeBlock>{hours < 10 ? 0 : hours.toString()[0]}</TimeBlock>
            <TimeBlock>{hours < 10 ? hours : hours.toString()[1]}</TimeBlock>
            <span>:</span>
            <TimeBlock>{minutes < 10 ? 0 : minutes.toString()[0]}</TimeBlock>
            <TimeBlock>
                {minutes < 10 ? minutes : minutes.toString()[1]}
            </TimeBlock>
            <span>:</span>
            <TimeBlock>{seconds < 10 ? 0 : seconds.toString()[0]}</TimeBlock>
            <TimeBlock>
                {seconds < 10 ? seconds : seconds.toString()[1]}
            </TimeBlock>
        </div>
    );
}

export default CountDown;
