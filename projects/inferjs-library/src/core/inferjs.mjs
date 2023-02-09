'use strict';

// Imports
import { type_of, validate, overload } from "../helpers/helpers.mjs";
import { InferExpectError, InferTypeError } from "../errors/errors.mjs";

/**
 * A runtime library that allows you to infer rules for extended type checking in JavaScript.
 * @class InferJS
 */
export class InferJS {

    // Private Fields
    #inferObject = null;

    /** Gets the inferObject created by the InferJS-Compiler. */
    get inferObject() { return this.#inferObject; }

    /** Sets the inferObject created by the InferJS-Compiler. */
    set inferObject(value) { this.#inferObject = value; }

    /**
     * The constructor for the InferJS-Library class.
     * @param {*} inferObject - The inferObject compiled by the InferJS-Compiler.
     */
    constructor() {

        // Overload this method.
        overload(this, 'constructor', arguments, true);

    }

    /**
     * The constructor for the InferJS-Library class with inferObject parameter.
     * @param {*} inferObject - The inferObject compiled by the InferJS-Compiler.
     */
    constructor1(inferObject) {
        
        this.#inferObject = inferObject;

    }

    /**
     * Checks a methods arguments or single variable against types and infer expectations.
     * @param {string} inferId - The inferid to map to.
     * @param {*} src - The method arguments object or single variable to check.
     * @param {boolean} returnException - Whether to return exception or throw it. Defaults to throwing exception.
     * @return {(null, InferTypeError|InferExpectError)} - Throws an exception or returns and exception, if parameter returnException is true, else returns null for success.
     */
    check(inferId, src, returnException = false) {

        // Check for overload
        if (type_of(src, true) === 'arguments') {
            
            // Check Method
            return this.#checkMethod(inferId, src, returnException);

        } else {

            // Check Variable
            return this.#checkVar(inferId, src, returnException);
        }
    }

    /**
     * Checks a variable for type and infer expectations.
     * @param {string} inferId - The inferid to map to.
     * @param {*} src - The variable to check.
     * @param {boolean} returnException - Whether to return exception or throw it. Defaults to throwing exception.
     * @return {(null, InferTypeError|InferExpectError)} - Throws an exception or returns and exception, if parameter returnException is true, else returns null for success.
     */
    #checkVar(inferId, src, returnException = false) {

    }

    /**
     * Checks the arguments object against types and infer expectations.
     * @param {string} inferId - The inferid to map to.
     * @param {*} args - The parameters to check.
     * @param {boolean} returnException - Whether to return exception or throw it. Defaults to throwing exception.
     * @return {(null, InferTypeError|InferExpectError)} - Throws an exception or returns and exception, if parameter returnException is true, else returns null for success.
     */
    #checkMethod(inferId, args, returnException = false) {

        // Check if inferid exists or through error
        if (type_of(this.#inferObject) !== 'object' || type_of(this.#inferObject.infers) !== 'object' || !this.#inferObject.infers.hasOwnProperty(inferId)) {

            const err = new TypeError(`Cannot find infer with inferid: ${inferId}`);
            if (returnException) throw err;
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
                    if (returnException) throw new InferTypeError(inf, i, argType + '|' + argTypeExt);
                    return new InferTypeError(inf, i, argType + '|' + argTypeExt);
                }

                // Get unique actual types
                const actualTypes = [argType, argTypeExt].filter((v, i, a) => a.indexOf(v) == i);

                for (let i2 = 0; i2 < actualTypes.length; i2++) {

                    const actualType = actualTypes[i2];

                    if (allowedTypes.hasOwnProperty(actualType)) {

                        const infers = allowedTypes[actualType].infers;
                        const infersArray = Object.keys(infers);

                        for (let i3 = 0; i3 < infersArray.length; i3++) {

                            const inferExpectation = infersArray[i3].toUpperCase();
                            const inferExpectationValue = infers[inferExpectation].value;

                            // Method for throwing
                            const THROW = () => {
                                if (returnException) throw new InferExpectError(inf, i, argType + '|' + argTypeExt, inferExpectation, argValue, inferExpectationValue);
                                return new InferExpectError(inf, i, argType + '|' + argTypeExt, inferExpectation, argValue, inferExpectationValue);
                            };

                            switch (inferExpectation) {

                                // Checks if string not empty
                                case 'STRING-NOT-EMPTY':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if string is empty
                                case 'STRING-EMPTY':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue string is of boolean type
                                case 'IS-BOOL':

                                    if (actualType !== 'string' && actualType !== 'boolean' && actualType !== 'number') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue between
                                case 'BETWEEN':

                                    if (actualType !== 'number') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue between inclusive
                                case 'BETWEEN-INCLUSIVE':

                                    if (actualType !== 'number') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if bigint inferExpectationValue between
                                case 'BETWEEN-BIGINT':

                                    if (actualType !== 'bigint') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if bigint inferExpectationValue between inclusive
                                case 'BETWEEN-BIGINT-INCLUSIVE':

                                    if (actualType !== 'bigint') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue is greater than EinferExpectationValue
                                case 'GREATER-THAN':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue is greater than equal EinferExpectationValue
                                case 'GREATER-THAN-EQUAL':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue is less than EinferExpectationValue
                                case 'LESS-THAN':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue is less than equal EinferExpectationValue
                                case 'LESS-THAN-EQUAL':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if matches regex pattern
                                case 'REGEX':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if a string is ALPHA Characters
                                case 'ALPHA':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if a string is a number        
                                case 'IS-NUMBER':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if a bigint or string bigint.
                                case 'IS-BIGINT':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if a number, float, bigint or numeric string
                                case 'IS-NUMERIC':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if string is alpha numeric.
                                case 'ALPHA-NUMERIC':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if case insensitive inferExpectationValue is in EinferExpectationValue array list
                                case 'IN-ARRAY-CI':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if case sensitive inferExpectationValue is in EinferExpectationValue array list
                                case 'IN-ARRAY':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if case insensitive inferExpectationValue is not in EinferExpectationValue array list
                                case 'NOT-IN-ARRAY-CI':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if case sensitive inferExpectationValue is not in EinferExpectationValue array list
                                case 'NOT-IN-ARRAY':

                                    if (actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check object extends all classes
                                case 'EXTENDS-ALL':

                                    if (actualType !== 'object') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check object extends at least one class
                                case 'EXTENDS':

                                    if (actualType !== 'object') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if inferExpectationValue object contains case sensitive properties in EinferExpectationValue array list.
                                case 'PROPS':

                                    if (actualType !== 'object') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check if array is not empty.
                                case 'ARRAY-NOT-EMPTY':

                                    if (actualType !== 'array') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if array is empty.
                                case 'ARRAY-EMPTY':

                                    if (actualType !== 'array') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Checks if array is of type list.
                                case 'ARRAY-TYPES':

                                    if (actualType !== 'array') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for INT8: -128 to 127
                                case 'CHAR':
                                case 'INT8':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for UINT8: 0 to 255
                                case 'UNSIGNED-CHAR':
                                case 'UCHAR':
                                case 'UINT8':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for INT16: -32768 to 32767
                                case 'SHORT':
                                case 'SHORT-INT':
                                case 'SIGNED-SHORT-INT':
                                case 'INT16':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for UINT16: 0 to 65535
                                case 'UNSIGNED-SHORT':
                                case 'UNSIGNED-SHORT-INT':
                                case 'USHORT':
                                case 'UINT16':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for INT32: -2147483648 to 2147483647
                                case 'SIGNED-INT':
                                case 'INT':
                                case 'INT32':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for UINT32: 0 to 4294967295
                                case 'UNSIGNED-INT':
                                case 'UINT':
                                case 'UINT32':

                                    if (actualType !== 'number' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for INT64: -9223372036854775808 to 9223372036854775807
                                case 'SIGNED-LONG':
                                case 'SIGNED-LONG-LONG':
                                case 'LONG':
                                case 'LONG-LONG':
                                case 'INT64':

                                    if (actualType !== 'bigint' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                // Check for UINT64: 0 to 18446744073709551615
                                case 'UNSIGNED-LONG':
                                case 'UNSIGNED-LONG-LONG':
                                case 'ULONG':
                                case 'UINT64':

                                    if (actualType !== 'bigint' && actualType !== 'string') break;
                                    if (!validate(inferExpectation, argValue, inferExpectationValue)) return THROW();
                                    break;

                                default: break;
                            }

                        }

                    }

                }

            }

        }

    }

}