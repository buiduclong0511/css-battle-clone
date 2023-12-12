import cx from "~/utils/cx";
import Header from "../Header";

function TaskLayout({ children }) {
    return (
        <div className={cx("pt-main-layout")}>
            <Header taskLayout />
            <main className={cx("h-[calc(100vh-60px)]")}>{children}</main>
        </div>
    );
}

export default TaskLayout;
