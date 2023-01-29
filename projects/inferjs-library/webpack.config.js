const path = require('path');
const terserPlugin = require("terser-webpack-plugin");
const pack = require('./package.json');

module.exports = {
    entry: './index.mjs',
    mode: 'production',
    output: {
        //library: 'inferjs',
        library: `inferjs`,
        libraryTarget: 'window',
        //libraryExport: 'infer',
        //libraryTarget: 'var',
        filename: `inferjs-${pack.version}.min.js`,
        path: path.resolve(__dirname, `../../dist/inferjs-library/clientside/`),
        globalObject: 'this',
    },

    experiments: {
        outputModule: true,
    },

    optimization: {
        minimizer: [
            new terserPlugin({
                terserOptions: {
                    keep_fnames: true,
                },
            }),
        ],
    },
};