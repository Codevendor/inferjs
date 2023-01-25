'use strict';

import { type_of } from "./type-of.mjs";

/**
 * Parses a string into a boolean.
 * @category helpers
 * @function parseBool
 * @param {(string|number|boolean)} src - A boolean, string boolean or number.
 * @returns {boolean} - True of false based on setting or -1 for error.
 */
export function parseBool(src) {

    switch (type_of(src)) {
        case 'boolean': return src;
        case 'string':

            src = src.trim().toUpperCase();
            switch (src) {

                case 'TRUE':
                case '1':
                case 'YES': return true;

                case 'FALSE':
                case '0':
                case 'NO': return false;

                default: return -1;

            }

        case 'number':

            switch (src) {
                case 0: return false;
                case 1: return true;

                default: return -1;
            }

        default: return -1;

    }

};