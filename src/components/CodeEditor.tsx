import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import './syntax.css'

interface CodeEditorProps {
  initialValue: string
  handleCodeChange(code: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  handleCodeChange,
}) => {
  const editorRef = useRef<any>()
  const mountedMonaco: EditorDidMount = (getString, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      handleCodeChange(getString())
    })
  }

  const onFormatClick = () => {
    const unformatCode: string = editorRef.current?.getModel()?.getValue() || ''

    const formatedCode: string = prettier
      .format(unformatCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: false,
        singleQuote: true,
      })
      .replace(/\n$/, '')

    editorRef.current?.setValue(formatedCode)
  }

  return (
    <div>
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
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
    </div>
  )
}

export default CodeEditor
