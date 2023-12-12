import Editor from "@monaco-editor/react";
import { emmetCSS, emmetHTML } from "emmet-monaco-es";
import { useEffect, useMemo, useRef, useState } from "react";

import cx from "~/utils/cx";
import TaskTabHeader from "../TaskTabHeader";
import Css from "../icons/Css";
import Html from "../icons/Html";

const emmet = {
    html: emmetHTML,
    css: emmetCSS,
};

const icons = {
    html: <Html />,
    css: <Css />,
};

function CodeEditor({ files = [], onChange = () => {} }) {
    const [_files, setFiles] = useState([]);
    const [editor, setEditor] = useState(null);
    const [monaco, setMonaco] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);

    const disposeEmmet = useRef(null);
    const positions = useRef({});

    const persistCursorPosition = () => {
        if (currentFile && !currentFile.isDisposed() && editor) {
            positions.current[currentFile.uri.path] = editor.getPosition();
        }
    };

    const handleSwitchFile = (file) => {
        setCurrentFile(file);
        editor.setModel(file);

        // Focus cursor on previous position
        const currentPosition = positions.current[file.uri.path];
        if (currentPosition) {
            editor.setPosition(currentPosition);
        }
        editor.focus();
    };

    const charactersCount = useMemo(
        () => files.reduce((prev, file) => prev + file.value.length, 0),
        [files]
    );

    useEffect(() => {
        if (editor && _files.length && !_files[0].isDisposed()) {
            const firstFile = _files[0];
            editor.setModel(firstFile);
            setCurrentFile(firstFile);
        }
    }, [_files, editor]);

    // On change file content
    useEffect(() => {
        _files.forEach((file) => {
            file.onDidChangeContent(() => {
                onChange({
                    name: file.uri.path.replace("/", ""),
                    content: file.getValue(),
                });
            });
        });
    }, [_files, onChange]);

    // Dispose file on unmount
    useEffect(() => {
        return () =>
            _files.forEach((file) => !file.isDisposed() && file.dispose());
    }, [_files]);

    // Enabled emmet
    useEffect(() => {
        if (currentFile && !currentFile.isDisposed() && monaco) {
            disposeEmmet.current = emmet[currentFile.getLanguageId()](monaco);
        }

        return () => disposeEmmet.current && disposeEmmet.current();
    }, [currentFile, monaco]);

    return (
        <div className={cx("flex flex-col", "h-full")}>
            <TaskTabHeader
                className={cx(
                    "p-0 pr-[12px]",
                    "flex justify-between items-center"
                )}
            >
                <div className={cx("h-full", "flex items-center")}>
                    {_files.map((file) => {
                        const active = file.id === currentFile?.id;
                        return (
                            <button
                                key={file.uri.path}
                                onClick={() => handleSwitchFile(file)}
                                className={cx(
                                    "h-full px-[16px]",
                                    "flex items-center gap-[4px]",
                                    {
                                        "bg-[#101418]": active,
                                    }
                                )}
                            >
                                <span>{icons[file.getLanguageId()]}</span>
                                {file.uri.path.replace("/", "")}
                            </button>
                        );
                    })}
                </div>
                <span>{charactersCount} characters</span>
            </TaskTabHeader>
            <div className={cx("flex-1")}>
                <Editor
                    height="100%"
                    theme="vs-dark"
                    options={{
                        fontSize: "18px",
                    }}
                    beforeMount={(monaco) => {
                        setMonaco(monaco);
                        setFiles(
                            files.map((file) => {
                                const _file = monaco.editor.createModel(
                                    file.value,
                                    file.type,
                                    monaco.Uri.file(file.name)
                                );

                                return _file;
                            })
                        );
                    }}
                    onChange={() => {
                        persistCursorPosition();
                    }}
                    onMount={(editor) => {
                        setEditor(editor);
                    }}
                />
            </div>
        </div>
    );
}

export default CodeEditor;
