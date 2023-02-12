// Imports
import test from "node:test";
import { InferJSCompiler } from "../src/core/inferjs-compiler.mjs";

export async function testParseFile() {

    const input = ``;

    const inputOptions = {};

    const output = '';

    const outputOptions = {};

    // Get class
    const ic = new InferJSCompiler();

    // Async Parse file 
    results = await ic.parseFile(input, inputOptions, output, outputOptions).catch((err) => {
        throw new Error(`Processing action parse-file had internal error: ${err}`);
    });

}

if (process.argv?.[1].endsWith('test-parse-file.mjs')) {
    
    test('Parse File', async(t) => {
        await testParseFile();
    });

}


