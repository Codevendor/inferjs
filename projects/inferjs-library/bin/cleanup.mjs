/**
 * Cleans up files and folders for InferJS-Library across multiple platforms.
 * @name cleanup.mjs
 */

//console.log(process.env["npm_package_version"])
//console.log(process.env["npm_package_name"]);
//process.exit();

// Imports
import fs from "node:fs";
import * as path from "node:path";

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
    "versions/version": `../../dist/inferjs-library/versions/${versionName}`,
    "versions/version/commonjs": `../../dist/inferjs-library/versions/${versionName}/commonjs`,
    "versions/version/esmodule": `../../dist/inferjs-library/versions/${versionName}/esmodule`,
    "versions/version/script": `../../dist/inferjs-library/versions/${versionName}/script`
};

// Loop through paths and resolve
const keys = Object.keys(paths);
for (let i = 0; i < keys.length; i++) {

    const key = keys[i];
    paths[key] = path.normalize(path.resolve(paths[key]));

}

//console.log(paths);

// Remove latest directory
console.log(`Removing directory and files in: ${paths['latest']}`);
fs.rmSync(paths['latest'], { recursive: true, force: true });

// Remove versions/version directory
console.log(`Removing directory and files in: ${paths['versions/version']}`);
fs.rmSync(paths['versions/version'], { recursive: true, force: true });

// Recreate latest
console.log(`Creating directory in: ${paths['latest']}`);
fs.mkdirSync(paths['latest'], { recursive: true });

// Recreate version
console.log(`Creating directory in: ${paths['latest/version']}`);
fs.mkdirSync(paths['latest/version'], { recursive: true });

// Recreate esmodule
console.log(`Creating directory in: ${paths['latest/version/esmodule']}`);
fs.mkdirSync(paths['latest/version/esmodule'], { recursive: true });

// Recreate commonjs
console.log(`Creating directory in: ${paths['latest/version/commonjs']}`);
fs.mkdirSync(paths['latest/version/commonjs'], { recursive: true });

// Recreate script
console.log(`Creating directory in: ${paths['latest/version/script']}`);
fs.mkdirSync(paths['latest/version/script'], { recursive: true });

// Recreate versions/version
console.log(`Creating directory in: ${paths['versions/version']}`);
fs.mkdirSync(paths['versions/version'], { recursive: true });

// Recreate versions/version/commonjs
console.log(`Creating directory in: ${paths['versions/version/commonjs']}`);
fs.mkdirSync(paths['versions/version/commonjs'], { recursive: true });

// Recreate versions/version/esmodule
console.log(`Creating directory in: ${paths['versions/version/esmodule']}`);
fs.mkdirSync(paths['versions/version/esmodule'], { recursive: true });

// Recreate versions/version/script
console.log(`Creating directory in: ${paths['versions/version/script']}`);
fs.mkdirSync(paths['versions/version/script'], { recursive: true });

