import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);

/**
 * Test function foo2.
 * @category tests
 * @function foo2
 * @param {string} msg - The message to send through console.log().
 * @infer {(string)} msg {STRING-NOT-EMPTY=12345} - Checks if string is not empty.
 * @inferid foo2
 */
function foo2(msg, id, send) {

    infer.check('foo2', arguments);
}

// Example Normal Call
foo2('', 1234, true);