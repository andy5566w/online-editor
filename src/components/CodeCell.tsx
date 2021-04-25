import CodeEditor from './CodeEditor'
import PreviewIframe from './preview'
import { useState, useEffect } from 'react'
import bundler from '../bundler'

const CodeCell: React.FC = () => {
  const initialCode = `import React from 'react';
import ReactDOM from 'react-dom'

const App = () => {
  return <div>Hi There~</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
`
  const [input, setInput] = useState('')
  const [code, setCode] = useState(() => initialCode)

  useEffect(() => {
    let timer: any
    try {
      timer = setTimeout(() => {
        handleBundle(input)
      }, 500)
    } catch (e) {
      console.log(e)
    }
    async function handleBundle(input: string) {
      const result = await bundler(input)
      setCode(result)
    }

    return () => clearTimeout(timer)
  }, [input])
  const onClick = async () => {
    try {
      const result = await bundler(input)
      setCode(result)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEditorChange = (value: string) => {
    setInput(value)
  }

  return (
    <div>
      <CodeEditor
        initialValue={initialCode}
        handleCodeChange={handleEditorChange}
      />
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <PreviewIframe code={code} />
    </div>
  )
}
export default CodeCell
