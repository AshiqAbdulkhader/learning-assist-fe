import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange }) {
  return (
    <div className="editorContainer">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => onChange(value ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
