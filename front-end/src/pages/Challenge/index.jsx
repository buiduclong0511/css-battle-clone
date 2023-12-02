import { useParams } from "react-router-dom";
import CodeEditor from "~/components/CodeEditor";
import defaultFileContent from "~/utils/defaultFileContent";

function Challenge() {
    const { id } = useParams();

    return (
        <CodeEditor
            files={[
                {
                    name: "index.html",
                    type: "html",
                    defaultValue: defaultFileContent.html,
                },
                {
                    name: "style.css",
                    type: "css",
                    defaultValue: defaultFileContent.css,
                },
            ]}
            onChange={console.log}
        />
    );
}

export default Challenge;
