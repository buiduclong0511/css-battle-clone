import Button from "~/components/Button";
import Section from "~/components/Section";
import Calendar from "~/components/icons/Calendar";

function HomePage() {
    return (
        <div>
            <Section
                icon={<Calendar />}
                title="Daily targets"
                description="A new target everyday for you to unwind. No leaderboards, no competition"
                rightButtons={[<Button key="1">View all daily targets</Button>]}
            >
                Daily
            </Section>
        </div>
    );
}

export default HomePage;
