import useCurrentUser from "~/hooks/auth/useCurrentUser";
import cx from "~/utils/cx";
import DailyTargets from "./DailyTargets";
import Welcome from "./Welcome";

function HomePage() {
    const { isAuthenticated } = useCurrentUser();
    return (
        <div>
            {!isAuthenticated && (
                <>
                    <Welcome />
                    <div className={cx("bg-[#27313a]", "h-[1px] my-[48px]")} />
                </>
            )}
            <DailyTargets />
        </div>
    );
}

export default HomePage;
