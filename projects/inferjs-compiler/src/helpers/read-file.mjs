'use strict';

import fs from "node:fs";

/**
 * 
 * @param {string} file The path to the file to read.
 * @param {string} encoding The encoding to read the file into.
 * @returns {object} An object containing the results.
 */
export function readFile(file, encoding) {

    return new Promise((resolve, reject) => {

        fs.readFile(file, encoding, function (err, data) {

            const o = {

                "err": err,
                "data": data

            };

            // Good resolve.
            resolve(o);

        });

    });

}