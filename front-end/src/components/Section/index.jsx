import cx from "~/utils/cx";

function Section({
    children,
    title = "",
    description = "",
    icon = null,
    rightButtons,
}) {
    return (
        <div className={cx("flex flex-col gap-[32px]")}>
            <div className={cx("flex justify-between gap-[16px]")}>
                <div className={cx("flex gap-[16px]")}>
                    {!!icon && (
                        <span
                            className={cx(
                                "flex justify-center items-center",
                                "w-[56px] h-[56px]",
                                "bg-[#20262e]",
                                "text-[#ffdf00]",
                                "rounded-full"
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    <div>
                        <h2
                            className={cx(
                                "text-[#eff5fb] text-[24px] font-[600]"
                            )}
                        >
                            {title}
                        </h2>
                        <p
                            className={cx(
                                "text-[#a0b3c6] text-[16px] font-[500]"
                            )}
                        >
                            {description}
                        </p>
                    </div>
                </div>
                {!!rightButtons && (
                    <div className={cx("flex items-center gap-[8px]")}>
                        {rightButtons}
                    </div>
                )}
            </div>
            <div>{children}</div>
        </div>
    );
}

export default Section;
