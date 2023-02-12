// Imports
import test from "node:test";
import { InferJSCompiler } from "../src/core/inferjs-compiler.mjs";

export async function testParseFileList() {

    const input = '';

    const inputOptions = {};

    const output = '';

    const outputOptions = {};

    // Get class
    ic = new InferJSCompiler();

    // Async Parse file 
    results = await ic.parseFileList(input, inputOptions, output, outputOptions).catch((err) => {
        throw new Error(`Processing action parse-file-list had internal error: ${err}`);
    });

}

if (process.argv?.[1].endsWith('test-parse-file-list.mjs')) {

    test('Parse File List', async (t) => {
        await testParseFileList();
    });

}