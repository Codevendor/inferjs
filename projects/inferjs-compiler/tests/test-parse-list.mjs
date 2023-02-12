// Imports
import test from "node:test";
import { InferJSCompiler } from "../src/core/inferjs-compiler.mjs";

export async function testParseList() {

    const input = '';

    const inputOptions = {};

    const output = '';

    const outputOptions = {};

    // Get class
    ic = new InferJSCompiler();

    // Async Parse file 
    results = await ic.parseList(input, inputOptions, output, outputOptions).catch((err) => {
        throw new Error(`Processing action parse-list had internal error: ${err}`);
    });

}

if (process.argv?.[1].endsWith('test-parse-list.mjs')) {

    test('Parse List', async (t) => {
        await testParseList();
    });

}