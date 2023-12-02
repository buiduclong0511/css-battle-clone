import { Link, useParams } from "react-router-dom";

import images from "~/assets/images";
import Button, { IconButton } from "~/components/Button";
import Light from "~/components/icons/Light";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";
import ChallengeSidebar from "./ChallengeSidebar";
import OnlineSignal from "./OnlineSignal";
import useChallengeDetail from "~/hooks/challenge/useChallengeDetail";
import Calendar from "~/components/icons/Calendar";
import dayjs from "dayjs";

function Header({ challengeLayout = false }) {
    const { id } = useParams();

    const { data } = useChallengeDetail({ id: challengeLayout ? id : null });

    return (
        <header
            className={cx(
                "fixed top-0 left-0 z-20",
                "w-full h-header",
                "flex items-center justify-between",
                "px-[24px]",
                "bg-header",
                "backdrop-blur-[20px]"
            )}
        >
            <div className={cx("flex items-center gap-[16px]")}>
                {challengeLayout && <ChallengeSidebar />}
                <Link to={webRoutes.public.home()}>
                    <img src={images.logo} alt="CSS Battle" />
                </Link>
                {!!data && (
                    <div
                        className={cx(
                            "flex items-center gap-[8px]",
                            "text-[#6b7b8e]",
                            "ml-[8px]"
                        )}
                    >
                        <Link
                            to={webRoutes.public.dailyTargets()}
                            className={cx("flex items-center gap-[8px]")}
                        >
                            <Calendar />
                            <span className={cx("font-[500]")}>
                                Daily Targets
                            </span>
                        </Link>
                        <span>&gt;</span>
                        <span className={cx("font-[700] text-[#fff]")}>
                            {dayjs(data.createdAt).format("D/MM/YYYY")}
                        </span>
                    </div>
                )}
            </div>
            <div className={cx("flex items-center gap-[12px]")}>
                <div>
                    <OnlineSignal />
                </div>
                <IconButton>
                    <Light />
                </IconButton>
                <Button href={webRoutes.auth.signIn()}>
                    Sign In / Sign Up
                </Button>
            </div>
        </header>
    );
}

export default Header;
