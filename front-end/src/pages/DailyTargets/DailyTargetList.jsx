import ChallengeItem from "~/components/ChallengeItem";
import TomorrowChallenge from "~/components/ChallengeItem/TomorrowChallenge";
import Panel from "~/components/Panel";
import Calendar from "~/components/icons/Calendar";
import cx from "~/utils/cx";
import tasks from "~/utils/data";

function DailyTargetList() {
    return (
        <div>
            <div className={cx("flex flex-col items-center gap-[8px]")}>
                <span className={cx("text-[#ffdf00]")}>
                    <Calendar className={cx("w-[32px] h-[32px]")} />
                </span>
                <h1 className={cx("text-[30px] text-[#fff] font-[700]")}>
                    Daily Target
                </h1>
                <p>
                    A new target everyday for you to unwind. No leaderboards, no
                    competition
                </p>
            </div>

            <Panel
                className={cx(
                    "flex justify-center gap-[32px]",
                    "mt-[40px]",
                    "bg-daily-target-top-panel",
                    "shadow-daily-target-top-panel"
                )}
            >
                <div className={cx("w-[236px]")}>
                    <ChallengeItem data={tasks[0]} />
                </div>
                <div className={cx("w-[320px]")}>
                    <ChallengeItem data={tasks[1]} active />
                </div>
                <div className={cx("w-[236px]")}>
                    <TomorrowChallenge />
                </div>
            </Panel>
        </div>
    );
}

export default DailyTargetList;
