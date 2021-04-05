import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plungins/unpkg-path-plungin'
import { fetchPlugin } from './plungins/fetch-plugin'

const App = () => {
  const [input, setInput] = useState('')
  const iframe = useRef<any>()

  const ref = useRef<any>()

  const onClick = async () => {
    if (!ref.current) return

    try {
      iframe.current.srcdoc = html

      const result = await ref.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      })

      iframe.current?.contentWindow?.postMessage(
        result.outputFiles[0].text,
        '*'
      )
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

  const html = `
    <html>
      <head></head>
      <body>
          <div id="root"></div>
          <script>
          window.addEventListener('message', event=>{
              try {
                eval(event.data)
              }catch (err) {
                const root = document.getElementById('root')
                root.innerHTML = '<div style="color:red;">'+err+'</div>'
                throw err
              }
          }, false)
          </script>
      </body>
    </html> 
  `
  return (
    <div>
      <textarea
        cols={150}
        rows={30}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <iframe ref={iframe} srcDoc={html} sandbox="allow-scripts" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
