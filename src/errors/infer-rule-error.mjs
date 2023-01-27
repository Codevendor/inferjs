'use strict';

import { numberRepresent, type_of } from "../helpers/helpers.mjs";

/** 
 * For handling inferjs errors.
 * @class InferRuleError
 * @category errors
 * @extends Error
 */
export class InferRuleError extends Error {

    /** Returns the error name. */
    get name() { return this.constructor.name }

    constructor() {
        
        super();

    }

}