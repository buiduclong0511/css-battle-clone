import cx from "~/utils/cx";
import Header from "../Header";

function ChallengeLayout({ children }) {
    return (
        <div className={cx("pt-main-layout")}>
            <Header challengeLayout />
            <main>{children}</main>
        </div>
    );
}

export default ChallengeLayout;
