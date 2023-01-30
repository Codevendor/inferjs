'use strict';

import { numberRepresent, type_of } from "../helpers/helpers.mjs";

/** 
 * For handling inferjs expect errors.
 * @module inferjs-library
 * @class InferExpectError
 * @category errors
 * @extends Error
 */
export class InferExpectError extends Error {

    // Private fields
    #inferObject = null;
    #paramPosition = 0;
    #actualType = '';
    #expectedType = '';
    #paramPositionRepresent = '';
    #method = '';
    #inferId = '';
    #methodSignature = '';
    #param = '';
    #inferExpectation = '';
    #argValue = '';
    #argValueSafe = '';
    #inferExpectationValue = '';
    #inferExpectationValueSafe = '';

    /** Gets the param position. */
    get paramPosition() { return this.#paramPosition; }

    /** Gets the actual type or types of the param. */
    get actualType() { return this.#actualType; }

    /** Gets the expected type of types of the param. */
    get expectedType() { return this.#getExpectedType; }

    /** Gets the method name from @function. */
    get method() { return this.#method; }

    /** Gets the inferId from @inferid. */
    get inferId() { return this.#inferId; }

    /** Gets the method signature. */
    get methodSignature() { return this.#methodSignature; }

    /** Gets the method param object. */
    get param() { return this.#param; }

    /** Gets the inferExpectation. */
    get inferExpectation() { return this.#inferExpectation; }

    /** Gets the argValue. */
    get argValue() { return this.#argValue; }

    /** Gets the argValueSafe. */
    get argValueSafe() { return this.#argValueSafe; }

    /** Gets the inferExpectationValue. */
    get inferExpectationValue() { return this.#inferExpectationValue; }

    /** Gets the inferExpectationValueSafe. */
    get inferExpectationValueSafe() { return this.#inferExpectationValueSafe; }

    /** Returns the error name. */
    get name() { return this.constructor.name }

    /**
     * The InferExpectError constructor.
     * @param {object} inferObject - The infer object. 
     * @param {number} paramIndex - The index of the param being checked.
     * @param {string} actualType - The actual type of the parameter.
     * @param {string} inferExpectation - The infer expectation for the argValue.
     * @param {any} argValue = The value for the argument.
     * @param {any} inferExpectationValue - The infer expectation value.
     */
    constructor(inferObject, paramIndex, actualType, inferExpectation, argValue, inferExpectationValue) {

        super();

        this.#inferExpectation = inferExpectation;
        this.#argValue = argValue;
        this.#argValueSafe = this.#convertArgToSafeString(argValue);
        this.#inferExpectationValue = inferExpectationValue;
        this.#inferExpectationValueSafe = this.#convertArgToSafeString(inferExpectationValue);

        this.#inferObject = inferObject;
        this.#paramPosition = paramIndex + 1;
        this.#actualType = this.#getUniqueActualType(actualType, true);
        this.#inferId = (inferObject.hasOwnProperty('@inferid')) ? inferObject['@inferid'] : 'Unknown';
        this.#paramPositionRepresent = numberRepresent(this.#paramPosition);
        this.#method = (inferObject.hasOwnProperty('@function')) ? inferObject['@function'] : '';
        this.#methodSignature = this.#getMethodSignature(inferObject);
        this.#param = Object.keys(inferObject['@param'])[paramIndex];
        this.#expectedType = this.#getExpectedType(inferObject, this.#param, true);

        this.message = `Incorrect ${this.#paramPositionRepresent} parameter, failed infer expectation type check in:\n` +
            `@inferid: ${this.#inferId}\n` +
            `@function: ${this.#methodSignature}\n` +
            `@param: ${this.#param}\n` +
            `Expectation Type: ${this.#inferExpectation}\n` +
            `Expectation Value: ${this.#inferExpectationValueSafe}\n` +
            `Argument Value: ${this.#argValueSafe}`;

    }

    /**
     * Converts an argument value to a string representation with JSON.stringify.
     * @param {*} argValue - The argument value to convert to string representation.
     * @returns {string} - Returns a string representation of the argValue. 
     */
    #convertArgToSafeString(argValue) {

        let safeString = '';

        try {

            safeString = JSON.stringify(argValue);

        } catch (err) {

            safeString = 'unknown';
        }

        return safeString;

    }

    /**
     * Gets the unique actual type.
     * @param {*} actualType - The actual type of types string sperated with pipe |.
     * @param {boolean} multiTypeParenthesis - Whether to add parenthesis to multi type return. 
     * @returns {string} = The type or types as a string.  
     */
    #getUniqueActualType(actualType, multiTypeParenthesis = false) {

        if (!actualType && type_of(actualType) !== 'string') return 'unknown';

        // Make unique
        const types = actualType.split('|').filter((v, i, a) => a.indexOf(v) == i);
        const typeString = types.join('|');

        return (multiTypeParenthesis && types.length > 1) ? '(' + typeString + ')' : typeString;

    }

    /**
     * Gets the expected paranm type or types.
     * @param {object} inferObject - The infer object to look in.
     * @param {string} paramName - The param name to look for. 
     * @param {boolean} multiTypeParenthesis - Whether to add parenthesis to multi type return. 
     * @returns {string} = The type or types as a string.
     */
    #getExpectedType(inferObject, paramName, multiTypeParenthesis = false) {

        let eType = 'unknown';

        if (inferObject && inferObject.hasOwnProperty('@param') && inferObject['@param'].hasOwnProperty(paramName) && inferObject['@param'][paramName].hasOwnProperty('types')) {

            const types = inferObject['@param'][paramName].types;
            const keys = Object.keys(types);
            const keyString = keys.join('|');

            eType = (multiTypeParenthesis && keys.length > 1) ? '(' + keyString + ')' : keyString;
        }

        return eType;

    }

    /**
     * Gets the method signature from the infer object.
     * @param {object} inferObject - The infer to get the message object from.
     * @returns {string} - An auto built method signature.
     */
    #getMethodSignature(inferObject) {

        // Variables
        let sig = (inferObject.hasOwnProperty('@function')) ? inferObject['@function'] + '( ' : '( ';

        if (inferObject.hasOwnProperty('@param')) {

            const params = Object.keys(inferObject['@param']);

            for (let i = 0; i < params.length; i++) {

                const paramName = params[i];
                const param = inferObject['@param'][paramName];

                // Build allowed type list
                const type = ((param.hasOwnProperty('types'))) ? '<' + Object.keys(param.types).join('|') + '>' : '<any>';

                sig += paramName + ': ' + type + ', ';

            }

            // Remove last comma.
            sig = (sig.endsWith(', ')) ? sig.slice(0, -2) : sig;

        }

        sig += ' )';

        return sig;

    }

}