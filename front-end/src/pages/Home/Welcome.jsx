import images from "~/assets/images";
import Button from "~/components/Button";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";

function Welcome() {
    return (
        <div className={cx("flex gap-[32px] items-center")}>
            <img
                src={images.welcomeSmall}
                alt="CSS Battle"
                className={cx("rounded-[16px]")}
            />
            <div>
                <h1 className={cx("text-[30px] text-[#fff] font-[700]")}>
                    Welcome to CSSBattle
                </h1>
                <p className={cx("max-w-[600px]", "text-[18px]")}>
                    The funnest multiplayer game with 300K+ web designers &
                    developers. Replicate the target images using CSS - the
                    shorter your code, the higher your score! Happy coding!
                </p>
                <Button
                    className={cx("mt-[14px]", "bg-[#0060ca]", "w-[180px]")}
                    href={webRoutes.signIn()}
                >
                    Sign In / Sign Up
                </Button>
            </div>
        </div>
    );
}

export default Welcome;
