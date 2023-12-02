import { useParams } from "react-router-dom";

import CodeEditor from "~/components/CodeEditor";
import cx from "~/utils/cx";
import defaultFileContent from "~/utils/defaultFileContent";
import Preview from "./Preview";
import Target from "./Target";
import useChallengeDetail from "~/hooks/challenge/useChallengeDetail";
import { useCallback, useState } from "react";
import Button from "~/components/Button";

const defaultFiles = [
    {
        name: "index.html",
        type: "html",
        value: defaultFileContent.html,
    },
    {
        name: "style.css",
        type: "css",
        value: defaultFileContent.css,
    },
];

function Challenge() {
    const { id } = useParams();

    const [files, setFiles] = useState(defaultFiles);

    const { data, isLoading } = useChallengeDetail({ id });

    const handleChangeFiles = useCallback((changedData) => {
        setFiles((files) => {
            return files.map((file) => {
                if (file.name !== changedData.name) {
                    return file;
                }
                return { ...file, value: changedData.content };
            });
        });
    }, []);

    if (isLoading) {
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
                    <CodeEditor files={files} onChange={handleChangeFiles} />
                </div>
                <div
                    className={cx(
                        "p-[16px] w-[400px]",
                        "border-t border-t-[#27313a]",
                        "flex gap-[16px]"
                    )}
                >
                    <Button className={cx("flex-1")}>Top Solutions</Button>
                    <Button className={cx("bg-[#0060ca]", "flex-1")}>
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

export default Challenge;
