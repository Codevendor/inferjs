'use strict';

// Imports
import { type_of, validate } from "../helpers/helpers.mjs";
import { InferError, InferTypeError } from "../errors/errors.mjs";
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
                const argValue = args[i];
                const paramName = expectParams[i];
                const param = inf['@param'][paramName];

                // Get allowed Types
                const allowedTypes = param.types;

                // Get argument type
                const argType = type_of(argValue);
                const argTypeExt = type_of(argValue, true);

                // Check if type exists
                if (!allowedTypes.hasOwnProperty(argType) && !allowedTypes.hasOwnProperty(argTypeExt, true)) {
                    if (throwException) throw new InferTypeError(inf, i, argType + '|' + argTypeExt);
                    return new InferTypeError(inf, i, argType + '|' + argTypeExt);
                }

                console.log('Key: ', param);
                console.log('test');

                // Get unique actual types
                const actualTypes = [argType, argTypeExt].filter((v, i, a) => a.indexOf(v) == i);

                for (let i2 = 0; i2 < actualTypes.length; i2++) {

                    const actualType = actualTypes[i2];

                    if (allowedTypes.hasOwnProperty(actualType)) {

                        const infers = allowedTypes[actualType].infers;
                        const infersArray = Object.keys(infers);

                        for (let i3 = 0; i3 < infersArray.length; i3++) {

                            const infer = infersArray[i3].toUpperCase();
                            const inferValue = infers[infer].value;

                            // Method for throwing
                            const THROW = () => {
                                throw new InferError(inf);
                            };

                            switch (infer) {

                                // Checks if string not empty
                                case 'STRING-NOT-EMPTY':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if string is empty
                                case 'STRING-EMPTY':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue string is of boolean type
                                case 'BOOL':

                                    if (actualType !== 'string' && actualType !== 'boolean' && actualType !== 'number') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue between
                                case 'BETWEEN':

                                    if (actualType !== 'number') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue between inclusive
                                case 'BETWEEN-INCLUSIVE':

                                    if (actualType !== 'number') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if bigint inferValue between
                                case 'BETWEEN-BIGINT':

                                    if (actualType !== 'bigint') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if bigint inferValue between inclusive
                                case 'BETWEEN-BIGINT-INCLUSIVE':

                                    if (actualType !== 'bigint') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue is greater than EinferValue
                                case 'GREATER-THAN':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue is greater than equal EinferValue
                                case 'GREATER-THAN-EQUAL':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue is less than EinferValue
                                case 'LESS-THAN':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue is less than equal EinferValue
                                case 'LESS-THAN-EQUAL':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if matches regex pattern
                                case 'REGEX':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if a string is ALPHA Characters
                                case 'ALPHA':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if a string is a number        
                                case 'ISNUMBER':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if a string is numeric
                                case 'ISNUMERIC':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if string is alpha numeric.
                                case 'ALPHA-NUMERIC':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if case insensitive inferValue is in EinferValue array list
                                case 'IN-LIST-CI':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if case sensitive inferValue is in EinferValue array list
                                case 'IN-LIST':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if case insensitive inferValue is not in EinferValue array list
                                case 'NOT-IN-LIST-CI':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if case sensitive inferValue is not in EinferValue array list
                                case 'NOT-IN-LIST':

                                    if (actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check object extends all classes
                                case 'EXTENDS-ALL':

                                    if (actualType !== 'object') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check object extends at least one class
                                case 'EXTENDS':

                                    if (actualType !== 'object') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if inferValue object contains case sensitive properties in EinferValue array list.
                                case 'PROPS':

                                    if (actualType !== 'object') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check if array is not empty.
                                case 'ARRAY-NOT-EMPTY':

                                    if (actualType !== 'array') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if array is empty.
                                case 'ARRAY-EMPTY':

                                    if (actualType !== 'array') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Checks if array is of type list.
                                case 'ARRAY-TYPES':

                                    if (actualType !== 'array') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for INT8: -128 to 127
                                case 'CHAR':
                                case 'INT8':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for UINT8: 0 to 255
                                case 'UNSIGNED CHAR':
                                case 'UCHAR':
                                case 'UINT8':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for INT16: -32768 to 32767
                                case 'SHORT':
                                case 'SHORT INT':
                                case 'SIGNED SHORT INT':
                                case 'INT16':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for UINT16: 0 to 65535
                                case 'UNSIGNED SHORT':
                                case 'UNSIGNED SHORT INT':
                                case 'USHORT':
                                case 'UINT16':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for INT32: -2147483648 to 2147483647
                                case 'SIGNED INT':
                                case 'INT':
                                case 'INT32':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for UINT32: 0 to 4294967295
                                case 'UNSIGNED INT':
                                case 'UINT':
                                case 'UINT32':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for INT64: -9223372036854775808 to 9223372036854775807
                                case 'SIGNED LONG':
                                case 'SIGNED LONG LONG':
                                case 'LONG':
                                case 'LONG LONG':
                                case 'INT64':

                                    if (actualType !== 'bigint' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                // Check for UINT64: 0 to 18446744073709551615
                                case 'UNSIGNED LONG':
                                case 'UNSIGNED LONG LONG':
                                case 'ULONG':
                                case 'UINT64':

                                    if (actualType !== 'bigint' && actualType !== 'string') break;
                                    if (!validate(infer, argValue, inferValue)) THROW();
                                    break;

                                default: break;
                            }

                        }

                    }

                }

            }

        }


        //console.log(inferId, params, this.#infers);

    }

}