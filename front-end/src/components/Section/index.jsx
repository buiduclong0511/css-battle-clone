import cx from "~/utils/cx";

function Section({
    children,
    title = "",
    description = "",
    icon = null,
    rightButtons,
}) {
    return (
        <div>
            <div className={cx("flex justify-between")}>
                <div className={cx("flex")}>
                    {!!icon && <span className={cx("")}>{icon}</span>}
                    <div>
                        <p>{title}</p>
                        <p>{description}</p>
                    </div>
                </div>
                {!!rightButtons && <div>{rightButtons}</div>}
            </div>
            <div>{children}</div>
        </div>
    );
}

export default Section;
