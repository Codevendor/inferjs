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

    /** Returns the error name. */
    get name() { return this.constructor.name }

    constructor() {
        
        super();

    }

}