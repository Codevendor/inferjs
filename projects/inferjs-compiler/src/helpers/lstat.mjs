'use strict';

import fs from "node:fs";

/**
 * Gets lstats on a file or folder.
 * @param {string} path The file or folder path to get stats from.
 * @param {object} options The options for optional parameters.
 * @returns {object} An object containing the results.
 */
export function lstat(path, options) {

    return new Promise((resolve, reject) => {

        fs.lstat(path, options, (err, stats) => {

            const o = {

                "err": err,
                "stats": stats

            };

            // Good resolve.
            resolve(o);

        });

    });

}