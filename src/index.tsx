import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as esbuild from 'esbuild-wasm'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const ref = useRef<any>()

  const onClick = async () => {
    if (!ref.current) return

    try {
      const result = await ref.current.transform(input, {
        loader: 'jsx',
        target: 'es2015',
      })
      setCode(result.code)
    } catch (e) {
      console.log(e)
    }
  }

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    })
  }

  useEffect(() => {
    startService()
  }, [])

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
