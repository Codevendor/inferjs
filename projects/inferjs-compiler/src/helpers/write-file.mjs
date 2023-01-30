'use strict';

import fs from "node:fs";

/**
  * 
  * @param {string} file The path to the file to write to.
  * @param {string} data The data to write.
  * @param {object} options The options for writing.
  * @returns {object} An object containing the results.
  */
export function writeFile(file, data, options) {

    return new Promise((resolve, reject) => {

        fs.writeFile(file, data, options, (err) => {

            const o = {

                "err": err

            };

            // Good resolve.
            resolve(o);

        });

    });

}