'use strict';

const REG_PARSE_OBJECT_STRING = /\[{0,1}([^\s\]]+)\s{0,}([^\s\]]+)\]{0,1}/;

/**
 * Checks the type of a source.
 * @module inferjs-compiler
 * @param {*} src - The source to type check.
 * @param {*} extended - Whether to extend the type checking and correct things wrong with type of.
 * @returns {string} - The string represent the type for the source.
 */
export function type_of(src, extended = false) {

    const srcType = typeof src;
    switch (srcType) {

        case 'undefined': return 'undefined';
        case 'string': return 'string';
        case 'number':

            if (!extended) return 'number';

            // check if nan
            if (isNaN(src)) return 'nan';

            // Check for infinity
            if (src === Infinity) return 'infinity';

            return 'number';

        case 'bigint': return 'bigint';
        case 'symbol': return 'symbol';
        case 'function':

            if (!extended) return 'function';

            if (src.name) return src.name;

            return 'function';

        case 'object':

            // Check if null
            if (src == null) return 'null';

            if (!extended) return 'object';

            // Check type
            const m = ({}).toString.call(src).match(REG_PARSE_OBJECT_STRING);

            if (!m || m.length !== 3) return 'object';

            // Convert m2[2] to lowercase
            m[2] = m[2].toLowerCase();

            switch (m[1]) {

                case 'string': return 'stringobject';
                case 'object':

                    switch (m[2]) {

                        case 'arguments': return 'arguments';
                        case 'array': return 'array';
                        case 'error': return (src.constructor.name) ? src.constructor.name : 'error';
                        default:

                            // Check if constructor
                            if (src.constructor.name) return src.constructor.name;

                            return 'object';

                    }

                // Return defualt object
                default: return 'object';

            }

        default:

            // Check if window
            if (typeof window !== 'undefined' && src === window) return 'window';

            // Return actual srcType reported
            return srcType;

    }

}