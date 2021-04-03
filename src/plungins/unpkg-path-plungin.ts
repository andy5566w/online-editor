import * as esbuild from 'esbuild-wasm'
import axios from 'axios'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args)
        if (args.path === 'index.js') return { path: args.path, namespace: 'a' }

        // 避免./ 或 ../ 讓unpgk去找錯誤的封包
        if (args.path.includes('./') || args.path.includes('../')) {
          console.log(
            'href',
            new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          )
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com/' + args.resolveDir + '/'
            ).href,
          }
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
        // else
        //   return {
        //     path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //     namespace: 'a',
        //   }
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          }
        }

        const { data, request } = await axios.get(args.path)

        console.log(new URL('./', request.responseURL))

        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
      })
    },
  }
}
