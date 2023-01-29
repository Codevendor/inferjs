'use strict';

import { type_of } from "./type-of.mjs";

/**
 * Checks if a number is between a min and max with inclusive.
 * @module inferjs-library
 * @category helpers
 * @function between
 * @param {number} value - The number or bigint to check.
 * @param {array[number]} values - The values to check.
 * @param {boolean=false} inclusive - Whether to check value includes self.
 * @returns {boolean} - Whether the number is between the min and max values.
 */
export function between(value, values, inclusive = false) {

    if (type_of(value) !== 'number') throw TypeError(`Incorrect Type for between(value: <${type_of(value)}>) expecting between(value: <number>)!`);
    if (type_of(values, true) !== 'array') throw TypeError(`Incorrect Type for between(values: <${type_of(values)}>) expecting between(values: <array[number]>)!`);
    if (values.length < 2) throw RangeError(`Incorrect range for between(values), length must be greater than 1. values.length = ${values.length}`);

    const min = Math.min(...values);
    const max = Math.max(...values);

    return inclusive ? value >= min && value <= max : value > min && value < max;
}

/**
 * Checks if a bigint is between a min and max with inclusive.
 * @module inferjs-library
 * @category helpers
 * @function betweenBigInt
 * @param {bigint} value - The number or bigint to check.
 * @param {array[bigint]} values - The values to check.
 * @param {boolean=false} inclusive - Whether to check value includes self.
 * @returns {boolean} - Whether the number is between the min and max values.
 */
export function betweenBigInt(value, values, inclusive = false) {
    
    if (type_of(value) !== 'bigint') throw TypeError(`Incorrect Type for betweenBigInt(value: <${type_of(value)}>) expecting betweenBigInt(value: <bigint>)!`);
    if (type_of(values, true) !== 'array') throw TypeError(`Incorrect Type for betweenBigInt(values: <${type_of(values)}>) expecting betweenBigInt(values: <array[bigint]>)!`);
    if (values.length < 2) throw RangeError(`Incorrect range for betweenBigInt(values), length must be greater than 1. values.length = ${values.length}`);

    values = values.sort((a, b) => (BigInt(a) > BigInt(b))? 0 : -1 );

    const min = values[0];
    const max = values[values.length - 1];
    
    return inclusive ? value >= min && value <= max : value > min && value < max;

} 