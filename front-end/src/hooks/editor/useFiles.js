import { useCallback, useState } from "react";

import defaultFileContent from "~/utils/defaultFileContent";

const _defaultFiles = [
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

function useFiles({ defaultFiles = _defaultFiles } = {}) {
    const [files, setFiles] = useState(defaultFiles);

    const onChangeFiles = useCallback((changedData) => {
        setFiles((files) => {
            return files.map((file) => {
                if (file.name !== changedData.name) {
                    return file;
                }
                return { ...file, value: changedData.content };
            });
        });
    }, []);

    return { files, onChangeFiles };
}

export default useFiles;
