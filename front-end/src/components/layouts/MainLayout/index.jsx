import Header from "~/components/layouts/Header";
import Sidebar from "~/components/layouts/Sidebar";
import cx from "~/utils/cx";

function MainLayout({ children }) {
    return (
        <div className={cx("pt-main-layout")}>
            <Header />
            <div className={cx("flex")}>
                <div className={cx("w-sidebar")}>
                    <div className={cx("fixed top-[60px] left-0")}>
                        <Sidebar />
                    </div>
                </div>
                <main
                    className={cx(
                        "flex flex-col",
                        "w-[calc(100%-218px)] min-h-[calc(100vh-60px)] p-main-layout"
                    )}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
