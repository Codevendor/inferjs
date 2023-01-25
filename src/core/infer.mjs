'use strict';

// Imports
import { type_of } from "../helpers/helpers.mjs";
import { InferTypeError } from "../errors/errors.mjs";
//import { getMethodSignature } from "./get-method-signature.js";
//import { parseMethodDefiniton } from "./parse-method-definition.js";
//import { parseMethodParamOrder } from "./parse-method-param-order.js";

/**
 * A runtime library that allows you to infer rules for extending type checking of method parameters in JavaScript.
 */
export class Infer {

    // Private Fields
    #inferObject = '';

    get inferObject() { return this.#inferObject; }

    constructor(inferObject) {

        this.#inferObject = inferObject;

    }

    /**
     * Checks the parameters against types and infer rules.
     * @param {string} inferId - The inferid to map to.
     * @param {*} args - The parameters to check.
     * @param {boolean} - Whether to throw exception or return it. Defaults to true throwing exception.
     */
    check(inferId, args, throwException = true) {

        // Check if inferid exists or through error
        if (type_of(this.#inferObject) !== 'object' || type_of(this.#inferObject.infers) !== 'object' || !this.#inferObject.infers.hasOwnProperty(inferId)) {

            const err = new TypeError(`Cannot find infer with inferid: ${inferId}`);
            if (throwException) throw err;
            return err;
        }

        // Convert infer to inf for shorthand
        const inf = this.#inferObject.infers[inferId];

        // Check if has @param
        if (inf.hasOwnProperty('@param')) {

            // Get all params
            const expectParams = Object.keys(inf['@param']);

            // Loop through expected params.
            for (let i = 0; i < expectParams.length; i++) {

                // Get param
                const paramName = expectParams[i];
                const param = inf['@param'][paramName];

                // Get allowed Types
                const allowedTypes = param.types;

                // Get argument type
                const argType = type_of(args[i]);
                const argTypeExt = type_of(args[i], true);

                // Check if type exists
                if (!allowedTypes.hasOwnProperty(argType) && !allowedTypes.hasOwnProperty(argTypeExt, true)) {
                    if (throwException) throw new InferTypeError(inf, i, argType + '|' + argTypeExt);
                    return new InferTypeError(inf, i, argType + '|' + argTypeExt);
                }

                //console.log('Key: ', param, allowedTypes);
            }

        }


        //console.log(inferId, params, this.#infers);

    }

}





///export function infer(parent, name, params)

/**
 * A runtime library that allows you to infer rules for extending type checking of method parameters in JavaScript.
 * @function infer
 * @param {object} parent - The parent to where the method can be found to infer. 
 * @param {string} name - The name of the method to find to infer.
 * @param {arguments} params - The javascript method arguments array.
 * @example infer(this, 'methodname', arguments);
 * @returns {boolean} - Returns a bool representing whether method was inferred.

export function infer(inferId, params) {

    // Params check
    //if (typeof parent !== 'object') throw new TypeError(``);
    //if (typeof name !== 'string') throw new TypeError(``);
    //if (typeof params !== 'arguments') throw new TypeError(``);

    // Get the method signature
    let sig = getMethodSignature(parent, name);

    // Check if sig is null
    if (sig === null) return false;

    // Parse sig definition
    sig.definition = parseMethodDefiniton(sig.definition);

    // Get the method params to loop through
    sig.paramOrder = parseMethodParamOrder(sig.method);

    // Check if paramorder or errors
    if (!Array.isArray(sig.paramOrder)) throw new Error(`Incorrect infer parsing`);

    // Loop through expected params
    sig.definition['@param'].forEach(eparam => {

        // Check if parameter is optional
        if (eparam.hasOwnProperty('optional') && eparam['optional']) return;

        

        // Check total required parameters
        //const totalExpectedParams = Object.keys(sig.definition['@param']).length;


    });

    // Loop through @param
    //for (let i = 0; i < )

    /*
    // Loop through parameters
    for (let i = 0; i < sig.paramOrder.length; i++) {

        // Get the parameter name
        const pname = sig.paramOrder[i];
        const paramValue = params[i];

        // Check if param exists
        if (!sig.definition['@param'].hasOwnProperty(pname)) continue;

        // Get expected types for type check
        const expectedTypes = sig.definition['@param'][pname].types;

        // Get the actual param type.
        const actualType = type_of(paramValue);
        const actualTypeExt = type_of(paramValue, true);

        if (expectedTypes.hasOwnProperty(actualType)) {
            
            console.log(`Found Processing actualtype ${name}`);

        } else if (expectedTypes.hasOwnProperty(actualTypeExt)) {
            
            console.log(`Found Processing actualtypeext ${name}`);

        } else {

            throw new TypeError(`Incorrect type for ${pname}`);

        }


    }

}
*/ 