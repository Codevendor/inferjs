'use strict';

import { type_of } from "./type-of.js";

/**
 * Checks if a string is numeric.
 * @category helpers
 * @function isNumeric
 * @param {number|string} src - The src to check if numeric.
 * @returns {boolean} - Whether src is numeric.
 */
export function isNumeric(src) {

    const src_t = type_of(src);
    if (src_t === 'number') return true;
    if (src_t !== 'string') return false;

    // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    // ...and ensure strings of whitespace fail
    return !isNaN(str) && !isNaN(parseFloat(str)); 
    
}