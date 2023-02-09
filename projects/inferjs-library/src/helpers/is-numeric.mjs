'use strict';

import { type_of } from "./type-of.mjs";
import { isBigInt } from "./is-bigint.mjs";

/**
 * Checks if src is a number, float, bigint or numeric string.
 * @module inferjs-library
 * @category helpers
 * @function isNumeric
 * @param {*} src - The src to check if numeric.
 * @returns {boolean} - Whether src is numeric.
 */
export function isNumeric(src) {

    switch (type_of(src, true)) {
        case 'number': 
        case 'bigint': return true;
        case 'string':
    
            if (isBigInt(src)) return true;
    
            // Trim spaces
            src = src.trim();

            return !isNaN(parseFloat(src)); 
        
        default: return false;
    }
    
}