/**
 * Builds the test1 commonjs example and InferObject.
 * @name build-test1-cjs-inferobject.mjs
 */

// Imports
import { exec } from "node:child_process";
import path from "node:path";

// Create a paths object
const paths = {

    "compiler": "../inferjs-compiler/src/main.mjs",
    "input-file": "./tests/test1-cjs.js",
    "output-file": "./tests/inferobjects/test1-cjs.io.js"
};

// Loop through paths and resolve
const keys = Object.keys(paths);
for (let i = 0; i < keys.length; i++) {

    const key = keys[i];
    paths[key] = path.resolve(paths[key]);

}

// Set command to exec for compiling InferObject
const compiler = `node ${paths['compiler']}`;
const cmd = `${compiler} -f --input-file=${paths['input-file']} --output-file-options-module='cjs' --output-file-options-flag='w+' --output-file=${paths['output-file']}`;

// Execute compiler to build inferobject for test1
exec(cmd, (error, stdout, stderr) => {
    
    // Check for error
    if (error) {
        console.log(error);
        return;
    }

    // Check for std error
    if (stderr) {
        console.log(stderr);
        return;
    } 

    console.log(stdout);

});
