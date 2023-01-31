/**
 * Builds the InferJS-Library in all types (commonjs, es6module, script) and compresses code.
 * @name build.mjs
 */

// Imports
import fs from "node:fs";
import path from "node:path";
import webpack from "webpack";
import esmoduleConf from "../configs/webpack.esmodule.config.js";
import commonjsConf from "../configs/webpack.commonjs.config.js";
import scriptConf from "../configs/webpack.script.config.js";

// Declare Variables
let cmd;

// Get version
const versionName = 'ver-' + process.env["npm_package_version"].split('.').join('-');

// Create a paths object
const paths = {

    "dist": "../../dist",
    "inferjs-library": "../../dist/inferjs-library",
    "latest": "../../dist/inferjs-library/latest",
    "latest/version": `../../dist/inferjs-library/latest/${versionName}`,
    "latest/version/commonjs": `../../dist/inferjs-library/latest/${versionName}/commonjs`,
    "latest/version/esmodule": `../../dist/inferjs-library/latest/${versionName}/esmodule`,
    "latest/version/script": `../../dist/inferjs-library/latest/${versionName}/script`,
    "versions": "../../dist/inferjs-library/versions",
    "versions/version": `../../dist/inferjs-library/versions/${versionName}`,
    "versions/version/commonjs": `../../dist/inferjs-library/versions/${versionName}/commonjs`,
    "versions/version/esmodule": `../../dist/inferjs-library/versions/${versionName}/esmodule`,
    "versions/version/script": `../../dist/inferjs-library/versions/${versionName}/script`

};

// Loop through paths and resolve
const keys = Object.keys(paths);
for (let i = 0; i < keys.length; i++) {

    const key = keys[i];
    paths[key] = path.resolve(paths[key]);

}

//console.log(paths);


/**
 * Builds the output file
 * @param {string} outputType - The output type (esmodule, commonjs, script).
 * @param {object} webpackConf - The webpack config object.
 */
function build(outputType, webpackConf) {

    // Build latest/version
    console.log(`Running: InferJS Library (${outputType}) webpack build ...`);
    const wpack = webpack(webpackConf);
    wpack.run((err, stats) => {

        // Error occurred
        if (err) { console.error(err); return; }

        // Wpack close event
        wpack.close((closeErr) => {

            // Error occurred
            if (closeErr) { console.error(err); return; }

            console.log(`Finished: InferJS Library (${outputType}) webpack build ...`);

            // Copy file
            const filePath = path.normalize(path.join(webpackConf.output.path, webpackConf.output.filename));
            const outputFilePath = path.normalize(path.join(paths['versions/version/' + outputType], webpackConf.output.filename));

            console.log(`Copying (${outputType}) to version directory ...\nFile: ${filePath}\nCopy: (${outputFilePath})\n`);

            // Copy file from latest to versions
            fs.copyFile(filePath, outputFilePath, (copyErr) => {

                // Error Occurred
                if (copyErr) { console.error(copyErr); return; }

                console.log(`Finished Copying (${outputType}).`);
            });

        });

        // Done processing write webpack results.
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            })
        );
    });

}

// Build configs
build('esmodule', esmoduleConf);
build('commonjs', commonjsConf);
build('script', scriptConf);





