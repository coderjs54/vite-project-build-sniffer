import path from 'node:path'
import { fileURLToPath } from 'url'
import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const bundle = await rollup({
  input: path.resolve(dirname, './buildSniffer.js')
})

const { output } = await bundle.generate({ format: 'iife', plugins: [terser()] })

await bundle.close()

const buildScript = output[0].code

const MESSAGE = '服务器有更新内容，需要刷新网页以获取最新内容'
const INTERVAL = 5 * 1000

export const vitePluginBuildSniffer = (options) => {
  const {
    message = MESSAGE,
    interval = INTERVAL
  } = options || {}
  return {
    name: 'vite-plugin-build-sniff',
    // 只在build期间应用
    apply: 'build',
    transformIndexHtml() {
      const name = 'last-modified'
      const content = `${Date.now()}`

      // 向文档中添加一个meta标签和一个script标签
      return [
        {
          tag: 'meta',
          attrs: { name, content }
        },
        {
          tag: 'script',
          attrs: {
            'data-sniff-message': message,
            'data-sniff-interval': `${interval}`
          },
          children: buildScript
        }
      ]
    }
  }
}