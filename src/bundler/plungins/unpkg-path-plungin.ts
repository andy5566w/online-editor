import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // entrypoint
      build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
        return { path: args.path, namespace: 'a' }
      })

      // 避免./ 或 ../ 讓unpgk去找錯誤的封包 -> ./src or ./helper
      // resolveDir 從 onLoad 過來, 避免沒有加到路徑前面的folder
      // handle relative path
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com/' + args.resolveDir + '/')
            .href,
        }
      })

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      })
    },
  }
}
