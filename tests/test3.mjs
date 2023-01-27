import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);

/**
 * Test function foo3.
 * @category tests
 * @function foo3
 * @param {string} msg - The message to send through console.log().
 * @infer {(string)} msg {STRING-NOT-EMPTY=123456} - Checks if string is not empty.
 * @inferid foo3
 */
function foo3(msg, id, send) {

    infer.check('foo3', arguments);
}

// Example Normal Call
foo3('');