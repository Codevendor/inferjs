'use strict';

/**
 * Gets the line number from the input by calculating newlines.
 * @param {string} input - The input to calculate from.
 * @param {string} word - The word to look for.
 * @returns {number} - The line number.
 */
export function getLineNumber(input, word) {

    const pos = input.indexOf(word);
    const sub = input.substring(0, pos);
    const newlines = sub.split("\n");
    return newlines.length;

}