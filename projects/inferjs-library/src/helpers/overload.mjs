'use strict';

/**
 * For overloading methods, pass in parameters.
 * @category helpers
 * @function overload
 * @param {object} src - The src this.
 * @param {string} methodName - The overloaded method name.
 * @param {arguments} args - The arguments to pass.
 * @param {boolean=false} removeOverloads - Whether to remove overloads.
 */
export function overload(src, methodName, args, removeOverloads = false) {

    src[`${methodName}${args.length}`](...args);
    if (removeOverloads) {
        for (let i = 0; i < args.length + 1; i++) {

            const name = `${methodName}${i}`;
            if (src[name]) delete src[name];

        }
    }

}