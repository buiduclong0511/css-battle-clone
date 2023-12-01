import { Link } from "react-router-dom";

import Button from "~/components/Button";
import Panel from "~/components/Panel";
import Google from "~/components/icons/Google";
import cx from "~/utils/cx";

function SignInPage() {
    return (
        <div
            className={cx(
                "min-h-full",
                "relative",
                "flex flex-col items-center"
            )}
        >
            <h1
                className={cx(
                    "text-heading text-[30px] font-[700]",
                    "my-[32px]"
                )}
            >
                Sign up / Sign in
            </h1>
            <div className={cx("relative")}>
                <Panel className={cx("min-w-[700px]")}>
                    <div className={cx("flex")}>
                        <input
                            type="text"
                            placeholder="example@domain.com"
                            className={cx(
                                "h-[53px] px-[18px]",
                                "border border-input outline-none",
                                "flex-1",
                                "bg-input",
                                "rounded-tl-[999px] rounded-bl-[999px]"
                            )}
                        />
                        <Button
                            className={cx(
                                "rounded-tl-none rounded-bl-none",
                                "h-[53px]"
                            )}
                        >
                            Sign in with Email
                        </Button>
                    </div>
                    <p className={cx("mt-[8px]")}>
                        This is a password-less login, so you don&apos;t need a
                        password.
                    </p>
                    <div
                        className={cx(
                            "flex justify-center items-center gap-[8px]",
                            "my-[24px]"
                        )}
                    >
                        <span
                            className={cx(
                                "inline-block w-[150px] h-[1px]",
                                "bg-login-or-divider"
                            )}
                        />
                        <span className={cx("text-highlight")}>OR</span>
                        <span
                            className={cx(
                                "inline-block w-[150px] h-[1px]",
                                "bg-login-or-divider"
                            )}
                        />
                    </div>
                    <div className={cx("flex justify-center")}>
                        <Button>
                            <Google /> <span>Sign in with Google</span>
                        </Button>
                    </div>
                </Panel>
                <div
                    className={cx(
                        "w-[80%] px-[32px] py-[16px]",
                        "absolute top-full left-1/2",
                        "-translate-x-1/2",
                        "text-center text-[14px]",
                        "rounded-b-[8px]",
                        "bg-[rgba(39,45,52,0.4)]",
                        "backdrop-blur-[20px]"
                    )}
                >
                    By using CSSBattle, you agree to our By using CSSBattle, you
                    agree to our&nbsp;
                    <Link to="/" className={cx("hover:underline")}>
                        Privacy Policy and Terms of Service
                    </Link>
                </div>
            </div>
            <div
                className={cx(
                    "absolute bottom-0 left-0",
                    "w-full h-[120px]",
                    "opacity-50",
                    "bg-login-bottom bg-contain bg-center",
                    "before:w-[200px] before:h-full before:inline-block",
                    "before:absolute before:top-0 before:left-0",
                    "before:bg-login-fade-before",
                    "after:w-[200px] after:h-full after:inline-block",
                    "after:absolute after:top-0 after:right-0",
                    "after:bg-login-fade-after"
                )}
            />
        </div>
    );
}

export default SignInPage;
