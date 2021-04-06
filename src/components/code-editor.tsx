import MonacoEditor from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  handleCodeChange(code: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  handleCodeChange,
}) => {
  const mountedMonaco = (getString: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      handleCodeChange(getString())
    })
  }

  return (
    <MonacoEditor
      editorDidMount={mountedMonaco}
      value={initialValue}
      language="javascript"
      height="500px"
      theme="dark"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
