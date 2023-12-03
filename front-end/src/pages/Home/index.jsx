import cx from "~/utils/cx";
import DailyTargets from "./DailyTargets";
import Welcome from "./Welcome";

function HomePage() {
    return (
        <div>
            <Welcome />
            <div className={cx("bg-[#27313a]", "h-[1px] my-[48px]")} />
            <DailyTargets />
        </div>
    );
}

export default HomePage;
