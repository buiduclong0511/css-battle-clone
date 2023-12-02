import cx from "~/utils/cx";

function ChallengeTabHeader({ children, className = "" }) {
    return (
        <div
            className={cx(
                "h-challenge-tab-header px-[16px]",
                "bg-[#21272d]",
                className
            )}
        >
            {children}
        </div>
    );
}

export default ChallengeTabHeader;
