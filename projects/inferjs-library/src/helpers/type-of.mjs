'use strict';

const REG_PARSE_OBJECT_STRING = /\[{0,1}([^\s\]]+)\s{0,}([^\s\]]+)\]{0,1}/;

/**
 * Checks the type of a source.
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
            const str2 = ({}).toString.call(src);
            const m2 = str2.match(REG_PARSE_OBJECT_STRING);

            if (!m2 || m2.length !== 3) return 'object';

            switch (m2[1]) {

                case 'string': return 'stringobject';
                case 'object':

                    // Check if array
                    if (m2[2].toLowerCase() === 'array') return 'array';

                    // Check if error
                    if (m2[2].toLowerCase() === 'error') return (src.constructor.name) ? src.constructor.name : 'error';
                    
                    // Check if constructor
                    if (src.constructor.name) return src.constructor.name;

                default: return 'object';

            }

        default:

            // Check if window
            if (typeof window !== 'undefined' && src === window) return 'window';


            return srcType;

    }

}