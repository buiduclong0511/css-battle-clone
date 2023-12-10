import Button from "~/components/Button";
import ChallengeItem from "~/components/ChallengeItem";
import TomorrowChallenge from "~/components/ChallengeItem/TomorrowChallenge";
import FadeContainer from "~/components/FadeContainer";
import Panel from "~/components/Panel";
import Section from "~/components/Section";
import Calendar from "~/components/icons/Calendar";
import useTasks from "~/hooks/task/useTask";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";

function DailyTargets() {
    const { data: tasks } = useTasks();

    return (
        <Section
            icon={<Calendar className={cx("!w-[24px] !h-[24px]")} />}
            title="Daily targets"
            description="A new target everyday for you to unwind. No leaderboards, no competition"
            rightButtons={[
                <Button key="1" href={webRoutes.dailyTargets()}>
                    View all daily targets
                </Button>,
            ]}
        >
            <FadeContainer className={cx("rounded-[16px] overflow-hidden")}>
                <Panel className={cx("overflow-x-auto", "w-full")}>
                    {!!tasks && (
                        <div
                            className={cx(
                                "inline-flex gap-[32px]",
                                "px-[200px]"
                            )}
                        >
                            {tasks.map((task, index, arr) => {
                                const active = index === arr.length - 1;

                                return (
                                    <div
                                        key={index}
                                        className={cx("w-[236px]", {
                                            "w-[320px]": active,
                                        })}
                                        ref={(ref) => {
                                            if (active && ref) {
                                                ref.scrollIntoView({
                                                    block: "nearest",
                                                    inline: "center",
                                                });
                                            }
                                        }}
                                    >
                                        <ChallengeItem
                                            active={active}
                                            data={task}
                                        />
                                    </div>
                                );
                            })}
                            <div className={cx("w-[236px]")}>
                                <TomorrowChallenge />
                            </div>
                        </div>
                    )}
                </Panel>
            </FadeContainer>
        </Section>
    );
}

export default DailyTargets;
