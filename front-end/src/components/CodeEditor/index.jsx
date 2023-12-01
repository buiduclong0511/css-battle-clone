import Editor from "@monaco-editor/react";
import { emmetCSS, emmetHTML } from "emmet-monaco-es";
import { useEffect, useRef, useState } from "react";

const emmet = {
    html: emmetHTML,
    css: emmetCSS,
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
                onChange({ name: file.uri.path, content: file.getValue() });
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
        <div>
            <div>
                {_files.map((file) => (
                    <button
                        key={file.uri.path}
                        onClick={() => handleSwitchFile(file)}
                    >
                        {file.uri.path.replace("/", "")}
                    </button>
                ))}
            </div>
            <Editor
                height="90vh"
                theme="vs-dark"
                beforeMount={(monaco) => {
                    setMonaco(monaco);
                    setFiles(
                        files.map((file) => {
                            const _file = monaco.editor.createModel(
                                file.defaultValue,
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
    );
}

export default CodeEditor;
