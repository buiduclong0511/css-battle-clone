import Footer from "~/components/layouts/Footer";
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
                <div>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
