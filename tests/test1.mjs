import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);

/**
 * Test case scenario for JavaScript inferjs function.
 * @category tests
 * @function foo
 * @param {string} msg - The message to send through console.log().
 * @param {(number|string)} id - The id of the message.
 * @param {boolean} [send=true] - Whether to send your message.
 * @infer {(string)} msg {STRING-NOT-EMPTY=1234} - Checks if string is not empty.
 * @infer {(number|null)} msg {INT8|INT16} - Check if number.
 * @inferid foo
 */
function foo(msg, id, send) {

    infer.check('foo', arguments);
}

// Example Normal Call
foo('', 1234, true);