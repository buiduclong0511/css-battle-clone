import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "~/components/Button";
import CodeEditor from "~/components/CodeEditor";
import useConfetti from "~/hooks/confetti/useConfetti";
import useFiles from "~/hooks/editor/useFiles";
import useTaskDetail from "~/hooks/task/useTaskDetail";
import useCreateUserSolution from "~/hooks/userSolution/useCreateUserSolution";
import cx from "~/utils/cx";
import Preview from "./Preview";
import Target from "./Target";

function Task() {
    const { id } = useParams();

    const { files, htmlFile, cssFile, charactersCount, onChangeFiles } =
        useFiles();

    const { data, isLoading: isFetching } = useTaskDetail(id);

    const { fire } = useConfetti();

    const { createUserSolution, isLoading: isSubmitting } =
        useCreateUserSolution({
            onSuccess: ({ data }) => {
                if (data.percentMatch > 90) {
                    fire({ type: "fireworks" });
                } else {
                    fire();
                }
                toast.success(
                    `Your scores is ${data.scores} points with ${data.percentMatch}% match.`
                );
            },
            onError: (error) => {
                console.log("🚀 ~ error:", error);
            },
        });

    const handleSubmit = useCallback(
        () =>
            createUserSolution({
                taskId: id,
                answers: { html: htmlFile.value, css: cssFile.value },
                charactersCount,
            }),
        [charactersCount, createUserSolution, cssFile.value, htmlFile.value, id]
    );

    if (isFetching || !data) {
        return null;
    }

    return (
        <div
            className={cx(
                "flex",
                "bg-[#121518]",
                "border-t border-t-[#27313a]",
                "h-full"
            )}
        >
            <div className={cx("flex-1 flex flex-col")}>
                <div className={cx("flex-1")}>
                    <CodeEditor
                        files={files}
                        charactersCount={charactersCount}
                        onChange={onChangeFiles}
                    />
                </div>
                <div
                    className={cx(
                        "p-[16px] w-[400px]",
                        "border-t border-t-[#27313a]",
                        "flex gap-[16px]"
                    )}
                >
                    <Button className={cx("flex-1")}>Top Solutions</Button>
                    <Button
                        className={cx("bg-[#0060ca]", "flex-1")}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <div className={cx("border-l border-l-[#27313a]")}>
                <Preview task={data} files={files} />
            </div>
            <div className={cx("border-l border-l-[#27313a]")}>
                <Target task={data} />
            </div>
        </div>
    );
}

export default Task;
