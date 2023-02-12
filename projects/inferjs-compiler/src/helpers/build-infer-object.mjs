'use strict';

import { type_of } from "./type-of.mjs";

/**
 * Builds a JavaScript InferObject for processing with import.
 * @param {object} inferObject - The inferobject
 * @param {string} moduleType - The module type to create of the InferObject. (esm|cjs|script|esmodule|commonjs)
 * @returns {string} - A json string representation of inferobject with assignment.
 */
export function buildInferObject(inferObject, moduleType) {

    // Convert to uppercase
    if (typeof (moduleType) === 'string') moduleType = moduleType.toUpperCase();

    try {

        switch (moduleType) {
            
            case 'ESM':
            case 'ESMODULE':

                return `export const InferObject = ${JSON.stringify(inferObject)};`
            
            case 'CJS':
            case 'COMMONJS':

                return `exports.InferObject = ${JSON.stringify(inferObject)};`
            
            case 'SCRIPT':            
            default:
                
                return `window.InferObject = ${JSON.stringify(inferObject)};`;
        }

    }
    catch (err) {
        throw new Error(`Method buildInferFile() failed converting inferObject with JSON.stringify: ${err}`);
    }

}