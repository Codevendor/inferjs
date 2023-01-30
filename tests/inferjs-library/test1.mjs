import { InferFile } from "./infers/test1.infer.mjs";
import { InferJS } from "../../projects/inferjs-library/src/core/inferjs.mjs";
const inferjs = new InferJS(InferFile);

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

    inferjs.check('foo', arguments);
}

// Example Normal Call
foo('', 1234, true);