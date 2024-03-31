/* eslint-disable @typescript-eslint/no-var-requires */
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts');
const postcss = require('rollup-plugin-postcss');
const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup');
const { terser } = require('rollup-plugin-terser');
const { getBabelOutputPlugin } = require('@rollup/plugin-babel');
const bundleSize = require('rollup-plugin-bundle-size');

const packageJson = require('./package.json');

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: false,
            },
        ],
        external: ['react', 'react-dom', 'date-fns'],
        plugins: [
            bundleSize(),
            resolve({
                resolveOnly: (module) => !/(@storybook\/react)|^react$|react-dom/.test(module),
            }),
            commonjs({ include: 'node_modules/**' }),
            typescript({
                tsconfig: './tsconfig.json',
                exclude: ['**/*.stories.tsx'],
            }),
            postcss({
                extract: 'index.css',
                modules: true,
                use: ['sass'],
                minimize: true,
            }),
            url(),
            svgr({ icon: true }),
            getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
            terser(),
        ],
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: packageJson.types, format: 'esm' }],
        external: [/\.(css|scss)$/],
        plugins: [dts.default()],
    },
];
