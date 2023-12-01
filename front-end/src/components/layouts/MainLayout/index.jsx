// import Footer from "~/components/layouts/Footer";
import Header from "~/components/layouts/Header";
import Sidebar from "~/components/layouts/Sidebar";
import cx from "~/utils/cx";

function MainLayout({ children }) {
    return (
        <div className={cx("pt-main-layout")}>
            <Header />
            <div className={cx("flex")}>
                <div className={cx("w-sidebar")}>
                    <Sidebar />
                </div>
                <div
                    className={cx(
                        "flex-1 flex flex-col",
                        "min-h-[calc(100vh-60px)]"
                    )}
                >
                    <main className={cx("flex-1")}>{children}</main>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
