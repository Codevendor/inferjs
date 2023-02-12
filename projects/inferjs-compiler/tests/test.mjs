// Imports
import test from "node:test";
import { testParseDir } from "./test-parse-dir.mjs";
import { testParseFile } from "./test-parse-file.mjs";
import { testParseFileList } from "./test-parse-file-list.mjs";
import { testParseList } from "./test-parse-list.mjs";

if (process.argv?.[1].endsWith('test.mjs')) {

    test('Parse File', async (t) => {
        await testParseFile();
    });

    test('Parse Directory', async (t) => {
        await testParseDir();
    });

    test('Parse File List', async (t) => {
        await testParseFileList();
    });

    test('Parse List', async (t) => {
        await testParseList();
    });

}