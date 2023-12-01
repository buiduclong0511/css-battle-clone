import { Link } from "react-router-dom";

import cx from "~/utils/cx";

function MenuItem({ children, href = "" }) {
    return (
        <Link className={cx("hover:underline", "text-[#eff5fb]")} to={href}>
            {children}
        </Link>
    );
}

export default MenuItem;
