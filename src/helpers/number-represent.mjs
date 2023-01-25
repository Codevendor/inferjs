'use strict';

import { type_of } from "./type-of.mjs";

const simple = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

/**
 * Changes a number into it's stringify representation, first, second, third, etc. 
 * @category helpers
 * @function numberRepresent
 * @param {number} src - The number 0 to 99.
 * @returns {string} - The number as a string representation.
 */
export function numberRepresent(src) {

    if (type_of(src) !== 'number') throw new TypeError(`Param (src) must be a number from 0 to 99!`);
    if (src < 0 || src > 99) throw new TypeError(`Param (src) must be a number from 0 to 99!`);

    if (src < 20) return simple[src];
    if (src % 10 === 0) return deca[Math.floor(src / 10) - 2] + 'ieth';
    return deca[Math.floor(src / 10) - 2] + 'y-' + simple[src % 10];

}