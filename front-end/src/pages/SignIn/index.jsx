import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "~/components/Button";
import FadeContainer from "~/components/FadeContainer";
import Panel from "~/components/Panel";
import Google from "~/components/icons/Google";
import STORAGE_KEYS from "~/constants";
import useCurrentUser from "~/hooks/auth/useCurrentUser";
import useSignInWithEmail from "~/hooks/auth/useSignInWithEmail";
import useSignInWithGoogle from "~/hooks/auth/useSignInWithGoogle";
import webRoutes from "~/router/webRoutes";
import cx from "~/utils/cx";
import storage from "~/utils/storage";

function SignInPage() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { trigger: signInWithEmail, isLoading } = useSignInWithEmail({
        onSuccess: () => {
            setEmail("");
            toast.success("Check your email inbox, please");
        },
    });

    const { mutate } = useCurrentUser();

    const { trigger: signInWithGoogle } = useSignInWithGoogle({
        onSuccess: (response) => {
            storage.set(STORAGE_KEYS.TOKEN, response.accessToken);
            mutate();
            navigate(webRoutes.home(), { replace: true });
        },
    });

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
                    "text-[#eff5fb] text-[30px] font-[700]",
                    "mb-[32px]"
                )}
            >
                Sign up / Sign in
            </h1>
            <div className={cx("relative")}>
                <Panel className={cx("min-w-[700px]")}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            signInWithEmail(email.trim());
                        }}
                        className={cx("flex")}
                    >
                        <input
                            value={email}
                            type="text"
                            placeholder="example@domain.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className={cx(
                                "h-[53px] px-[18px]",
                                "border border-[#323f4a] outline-none",
                                "flex-1",
                                "bg-[#0f1117]",
                                "rounded-tl-[999px] rounded-bl-[999px]"
                            )}
                        />
                        <Button
                            className={cx(
                                "rounded-tl-none rounded-bl-none",
                                "h-[53px]"
                            )}
                            type="submit"
                            disabled={!email || isLoading}
                        >
                            Sign in with Email
                        </Button>
                    </form>
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
                                "bg-[#323f4a]"
                            )}
                        />
                        <span className={cx("text-[#eff5fb]")}>OR</span>
                        <span
                            className={cx(
                                "inline-block w-[150px] h-[1px]",
                                "bg-[#323f4a]"
                            )}
                        />
                    </div>
                    <div className={cx("flex justify-center")}>
                        <Button onClick={signInWithGoogle}>
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
            <FadeContainer
                deep
                className={cx(
                    "absolute bottom-0 left-0",
                    "w-full h-[120px]",
                    "opacity-50",
                    "bg-login-bottom bg-contain bg-center"
                )}
            />
        </div>
    );
}

export default SignInPage;
