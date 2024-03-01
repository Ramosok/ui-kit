const typescript = require('@rollup/plugin-typescript')
const postcss = require('rollup-plugin-postcss')
const url = require('@rollup/plugin-url')
const svgr = require('@svgr/rollup')
const terser = require('@rollup/plugin-terser')
const dts = require('rollup-plugin-dts')
const packegeJson = require('./package.json')

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packegeJson.module,
        format: 'cjs'
      },
      {
        file: packegeJson.main,
        format: 'esm'
      }
    ],
    external: ['react'],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      postcss({
        extract: 'index.css',
        modules: true,
        use: ['sass'],
        minimize: true
      }),
      url(),
      svgr({ icon: true }),
      terser()
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: packegeJson.types, format: 'esm' }],
    external: [/\.(css|scss)$/],
    plugins: [dts.default()]
  }
]
