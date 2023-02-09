'use strict';

import { type_of } from "./type-of.mjs";
import { parseBool } from "./parse-bool.mjs";
import { between, betweenBigInt } from "./between.mjs";
import { isNumeric } from "./is-numeric.mjs";
import { isBigInt } from "./is-bigint.mjs";

// Regex functions
const REG_NUMERIC = new RegExp(`^[-]{0,1}[0-9]+[n]{0,1}$`);
const REG_ALPHA = new RegExp(`^[a-zA-Z]+$`);
const REG_ALPHA_NUMERIC = new RegExp(`^[a-zA-Z0-9]+$`);
const REG_NUMBER = new RegExp(`^[+-]{0,1}[0-9]{1,}[.]{0,1}[0-9]{0,}[e]{0,1}[+-]{0,1}[0-9]{0,}$`);

/**
 * Validates a value by type.
 * @module inferjs-library
 * @category helpers
 * @function validate
 * @param {string} method - The method to validate with.
 * @param {any} value - The value to validate.
 * @param {any} evalue - The expected value.
 */
export function validate(method, value, evalue) {

    // Check if param method is correct
    if (type_of(method) !== 'string') throw TypeError(`Incorrect Type for validate(method: <${type_of(method)}>) expecting validate(method: <string>)!`);

    switch (method.toUpperCase()) {

        // Checks if null
        case 'UNDEFINED': return (type_of(value) === 'undefined');

        // Checks if null
        case 'NULL': return (type_of(value) === 'null');

        // Checks if symbol
        case 'SYMBOL': return (type_of(value) === 'symbol');

        // Checks if boolean
        case 'BOOLEAN': return (type_of(value) === 'boolean');

        // Checks if string
        case 'STRING': return (type_of(value) === 'string');

        // Checks if number
        case 'NUMBER': return (type_of(value) === 'number');

        // Checks if bigint
        case 'BIGINT': return (type_of(value) === 'bigint');

        // Checks if array
        case 'ARRAY': return (type_of(value) === 'array');

        // Checks if object
        case 'OBJECT': return (type_of(value) === 'object');

        // Checks if string not empty
        case 'STRING-NOT-EMPTY': return (value.toString().trim() !== '');

        // Checks if string is empty
        case 'STRING-EMPTY': return (value.toString().trim() === '');

        // Checks if value string is of boolean type
        case 'IS-BOOL': return (parseBool(value) === -1) ? false : true;

        // Checks if value between
        case 'BETWEEN': return between(value, evalue);

        // Checks if value between inclusive
        case 'BETWEEN-INCLUSIVE': return between(value, evalue, true);

        // Checks if bigint value between
        case 'BETWEEN-BIGINT': return betweenBigInt(value, evalue);

        // Checks if bigint value between inclusive
        case 'BETWEEN-BIGINT-INCLUSIVE': return betweenBigInt(value, evalue, true);

        // Checks if value is greater than evalue
        case 'GREATER-THAN': return (parseInt(value) > parsent(evalue));

        // Checks if value is greater than equal evalue
        case 'GREATER-THAN-EQUAL': return (parseInt(value) >= parsent(evalue));

        // Checks if value is less than evalue
        case 'LESS-THAN': return (parseInt(value) < parsent(evalue));

        // Checks if value is less than equal evalue
        case 'LESS-THAN-EQUAL': return (parseInt(value) <= parsent(evalue));

        // Checks if matches regex pattern
        case 'REGEX':

            const reg = new RegExp(evalue);
            return reg.test(value.toString());

        // Checks if a string is ALPHA Characters
        case 'ALPHA': return REG_ALPHA.test(value.toString());

        // Checks if a string is a number        
        case 'IS-NUMBER': return REG_NUMBER.test(value.toString());

        // Checks if value is bigint or string bigint.
        case 'IS-BIGINT': return isBigInt(value);

        // Checks if value is a number, float, bigint or numeric string
        case 'IS-NUMERIC': return isNumeric(value);

        // Checks if string is alpha numeric.
        case 'ALPHA-NUMERIC': return REG_ALPHA_NUMERIC.test(value.toString());

        // Checks if case insensitive value is in evalue array list
        case 'IN-ARRAY-CI':

            evalue = evalue.join('|').toLowerCase().split('|');
            value = value.toLowerCase();

        // Checks if case sensitive value is in evalue array list
        case 'IN-ARRAY': return evalue.includes(value);

        // Checks if case insensitive value is not in evalue array list
        case 'NOT-IN-ARRAY-CI':

            evalue = evalue.join('|').toLowerCase().split('|');
            value = value.toLowerCase();

        // Checks if case sensitive value is not in evalue array list
        case 'NOT-IN-ARRAY': return !evalue.includes(value);

        // Check object extends all classes
        case 'EXTENDS-ALL':

            // Check type first
            if (type_of(value) !== 'object') return false;

            // Convert to array for checking
            if (!Array.isArray(evalue)) evalue = [evalue];

            for (let i = 0; i < evalue.length; i++) {
                if (!(value instanceof evalue[i])) return false;
            }

            return true;

        // Check object extends at least one class
        case 'EXTENDS':

            // Check type first
            if (type_of(value) !== 'object') return false;

            // Convert to array for checking
            if (!Array.isArray(evalue)) evalue = [evalue];

            for (let i = 0; i < evalue.length; i++) {
                if (value instanceof evalue[i]) return true;
            }

            return false;

        // Checks if value object contains case sensitive properties in evalue array list.
        case 'PROPS':

            // Check type first
            if (type_of(value) !== 'object') return false;

            const keys = Object.keys(value);
            keys.forEach(key => {
                if (!evalue.includes(key)) return false;
            });

            return true;

        // Check if array is not empty.
        case 'ARRAY-NOT-EMPTY': return (value.length > 0);

        // Checks if array is empty.
        case 'ARRAY-EMPTY': return (value.length === 0);

        // Checks if array is of type list.
        case 'ARRAY-TYPES':

            if (type_of(evalue) === 'string') evalue = [evalue];

            value.forEach(item => {

                evalue.forEach(item2 => {

                    if (!validate(item2, item)) return false;

                });

            });

            return true;

        // Check for INT8: -128 to 127
        case 'CHAR':
        case 'INT8':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [-128, 127], true)) return false;

            return true;

        // Check for UINT8: 0 to 255
        case 'UNSIGNED-CHAR':
        case 'UCHAR':
        case 'UINT8':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [0, 255], true)) return false;

            return true;

        // Check for INT16: -32768 to 32767
        case 'SHORT':
        case 'SHORT-INT':
        case 'SIGNED-SHORT-INT':
        case 'INT16':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [-32768, 32767], true)) return false;

            return true;

        // Check for UINT16: 0 to 65535
        case 'UNSIGNED-SHORT':
        case 'UNSIGNED-SHORT-INT':
        case 'USHORT':
        case 'UINT16':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [0, 65535], true)) return false;

            return true;

        // Check for INT32: -2147483648 to 2147483647
        case 'SIGNED-INT':
        case 'INT':
        case 'INT32':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [-2147483648, 2147483647], true)) return false;

            return true;

        // Check for UINT32: 0 to 4294967295
        case 'UNSIGNED-INT':
        case 'UINT':
        case 'UINT32':

            if (!isNumeric(value)) return false;
            value = parseInt(value);
            if (isNaN(value)) return false;
            if (!between(value, [0, 4294967295], true)) return false;

            return true;

        // Check for INT64: -9223372036854775808 to 9223372036854775807
        case 'SIGNED-LONG':
        case 'SIGNED-LONG-LONG':
        case 'LONG':
        case 'LONG-LONG':
        case 'INT64':

            if (!isNumeric(value)) return false;
            value = value.toString();
            if (value.endsWith('n')) value = value.slice(0, -1);
            if (!between(BigInt(value), [BigInt('-9223372036854775808'), BigInt('9223372036854775807')], true)) return false;

            return true;

        // Check for UINT64: 0 to 18446744073709551615
        case 'UNSIGNED-LONG':
        case 'UNSIGNED-LONG-LONG':
        case 'ULONG':
        case 'UINT64':

            if (!isNumeric(value)) return false;
            value = value.toString();
            if (value.endsWith('n')) value = value.slice(0, -1);
            if (!between(BigInt(value), [BigInt('0'), BigInt('18446744073709551615')], true)) return false;

            return true;

        // Type not defined return false.
        default: return false;

    }

}