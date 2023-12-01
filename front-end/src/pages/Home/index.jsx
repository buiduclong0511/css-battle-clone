import Button from "~/components/Button";
import ChallengeItem from "~/components/ChallengeItem";
import FadeContainer from "~/components/FadeContainer";
import Panel from "~/components/Panel";
import Section from "~/components/Section";
import Calendar from "~/components/icons/Calendar";
import paths from "~/router/paths";
import cx from "~/utils/cx";

function HomePage() {
    return (
        <div>
            <Section
                icon={<Calendar className={cx("!w-[24px] !h-[24px]")} />}
                title="Daily targets"
                description="A new target everyday for you to unwind. No leaderboards, no competition"
                rightButtons={[
                    <Button key="1" href={paths.public.dailyTargets}>
                        View all daily targets
                    </Button>,
                ]}
            >
                <FadeContainer className={cx("rounded-[16px] overflow-hidden")}>
                    <Panel className={cx("overflow-x-auto", "w-full")}>
                        <div
                            className={cx(
                                "inline-flex gap-[32px]",
                                "px-[200px]"
                            )}
                        >
                            {Array.from({ length: 30 }).map((item, index) => (
                                <div
                                    key={item}
                                    className={cx("w-[236px]", {
                                        "w-[320px]": index === 0,
                                    })}
                                >
                                    <ChallengeItem active={index === 0} />
                                </div>
                            ))}
                        </div>
                    </Panel>
                </FadeContainer>
            </Section>
        </div>
    );
}

export default HomePage;
