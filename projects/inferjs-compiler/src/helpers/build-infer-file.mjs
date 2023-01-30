'use strict';

/**
 * Builds a JavaScript InferFile for processing with import.
 * @param {object} infersObject - The infersobject
 * @returns {string} - A string export of a json representation of infers.
 */
export function buildInferFile(infersObject) {

    let json = '';

    try {
        json = `export const InferFile = ${JSON.stringify(infersObject)};`
    }
    catch (err) {
        throw new Error(`Method buildInferFile() failed converting infersObject with JSON.stringify: ${err}`);
    }

    return json;

}