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
 * @infer {(string)} msg {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid foo
 */
function foo(msg, id, send) {

    infer.check('foo', arguments);
}

// Example Normal Call
foo('test', 1234, true);