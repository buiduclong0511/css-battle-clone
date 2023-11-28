import images from "~/assets/images";
import Button, { IconButton } from "~/components/Button";
import Light from "~/components/icons/Light";
import paths from "~/router/paths";
import cx from "~/utils/cx";
import OnlineSignal from "./OnlineSignal";

function Header() {
    return (
        <header
            className={cx(
                "fixed top-0 left-0",
                "w-full h-header",
                "flex items-center justify-between",
                "px-[24px]",
                "bg-header",
                "backdrop-blur-header"
            )}
        >
            <img src={images.logo} alt="CSS Battle" />
            <div className={cx("flex items-center gap-[12px]")}>
                <div>
                    <OnlineSignal />
                </div>
                <IconButton>
                    <Light />
                </IconButton>
                <Button href={paths.auth.signIn}>Sign In / Sign Up</Button>
            </div>
        </header>
    );
}

export default Header;
