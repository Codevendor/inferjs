import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);

/**
 * Test function foo4.
 * @category tests
 * @function foo4
 * @param {string} msg - The message to send through console.log().
 * @infer {(string)} msg {STRING-NOT-EMPTY=123456} - Checks if string is not empty.
 * @inferid foo4
 */
function foo4(msg, id, send) {

    infer.check('foo4', arguments);
}

// Example Normal Call
foo4('');