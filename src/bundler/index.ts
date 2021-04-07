import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plungins/unpkg-path-plungin'
import { fetchPlugin } from './plungins/fetch-plugin'

let server: esbuild.Service

const bundler = async (rawCode: string) => {
  if (!server)
    server = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })

  const result = await server.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  })
  return result.outputFiles[0].text
}

export default bundler
