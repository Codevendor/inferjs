const path = require('path');
const terserPlugin = require("terser-webpack-plugin");
const pack = require('../package.json');

// Imports
//import * as pack from "../package.json"; 
//import * as path from "node:path";
//import * as terserPlugin from "../node_modules/terser-webpack-plugin";

// Get version
const versionName = 'ver-' + pack.version.split('.').join('-');

// Get name
const outputFileName = pack.name + '-' + pack.version + '.min.js';

// Create a paths object
const paths = {

    "entry": "../../projects/inferjs-library/index.mjs",
    "outputFilePath": `../../dist/inferjs-library/latest/${versionName}/commonjs`,

};

// Loop through paths and resolve
const keys = Object.keys(paths);
for (let i = 0; i < keys.length; i++) {

    const key = keys[i];
    paths[key] = path.normalize(path.resolve(paths[key]));

}



//console.log(paths);

module.exports = {
    entry: paths['entry'],
    mode: 'production',
    output: {
        //library: 'inferjs',
        //library: `InferJS`,
        libraryTarget: 'commonjs-module',
        //library: { type: 'module' },
        //libraryTarget: 'var',
        //libraryTarget: 'window',
        //libraryExport: 'infer',
        //libraryTarget: 'var',
        filename: outputFileName,
        path: paths['outputFilePath'],
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
                    keep_classnames: true,
                    compress: true,
                    mangle: false,
                    output: {
                        comments: false,
                    },

                },
            }),
        ],
    },

};

