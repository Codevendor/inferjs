'use strict';

import fs from "node:fs";

/**
  * The fs.readdir() method is used to asynchronously read the contents of a given directory. The callback of this method returns an array of all the file names in the directory. The options argument can be used to change the format in which the files are returned from the method.
  * @param {string} path The path to the file to remove.
  * @returns {object} An object containing the results. 
  */
export function readDir(path) {

    return new Promise((resolve, reject) => {

        fs.readdir(path, (err, files) => {

            const o = {

                "err": err,
                "files": files

            };

            // Good resolve.
            resolve(o);

        });

    });
}