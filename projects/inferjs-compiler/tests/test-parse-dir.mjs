// Imports
import test from "node:test";
import { InferJSCompiler } from "../src/core/inferjs-compiler.mjs";

export async function testParseDir() {

    const input = '';

    const inputOptions = {};

    const output = '';

    const outputOptions = {};

    // Get class
    ic = new InferJSCompiler();

    // Async Parse file 
    results = await ic.testParseDir(input, inputOptions, output, outputOptions).catch((err) => {
        throw new Error(`Processing action parse-dir had internal error: ${err}`);
    });

}

if (process.argv?.[1].endsWith('test-parse-dir.mjs')) {

    test('Parse Dir', async (t) => {
        await testParseDir();
    });

}