import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plungins/unpkg-path-plungin'
import { fetchPlugin } from './plungins/fetch-plugin'
import CodeEditor from './components/code-editor'
import PreviewIframe from './components/preview'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const ref = useRef<any>()

  const onClick = async () => {
    if (!ref.current) return

    try {
      const result = await ref.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      })
      setCode(result.outputFiles[0].text)
    } catch (e) {
      console.log(e)
    }
  }

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const handleEditorChange = (value: string) => {
    setInput(value)
  }

  return (
    <div>
      <CodeEditor
        initialValue="const a = 12;"
        handleCodeChange={handleEditorChange}
      />
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <PreviewIframe code={code} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
