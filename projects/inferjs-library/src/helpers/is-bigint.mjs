'use strict';

import { type_of } from "./type-of.mjs";

const REG_IS_BIG_INT = /^|[\d]+n|^[\d]{17,}n{0,}$|^900719925474099[2-9]{1}$|^[\d]{0,}\.[\d]+e\+[\d]{0,}$/gmi;

/**
 * Checks if src is a bigint or string bigint.
 * @module inferjs-library
 * @category helpers
 * @function isBigInt
 * @param {*} src - The src to check if bigint or string bigint.
 * @returns {boolean} - Whether src is bigint or string bigint.
 */
export function isBigInt(src) {

    switch (type_of(src, true)) {

        case 'bigint': return true;
        case 'string':
            
            // Trim spaces
            src = src.trim();

            // Check for empty
            if (src === '') return false;

            // Check if match
            if (!REG_IS_BIG_INT.test(src)) return false;

            // Check if ends with n remove
            if (src.endsWith('n')) src = src.slice(0, -1);

            // Try parsing it
            try {
                src = BigInt(src);
            } catch (err) {
                return false;
            }

            return true;
        
        default: return false;
    }

}