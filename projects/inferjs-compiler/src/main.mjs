// Imports
import { parseArgv } from "./helpers/helpers.mjs";
import { InferJSCompiler } from "./core/inferjs-compiler.mjs";

async function main(argv) {

    // Compiler requires more than 1 parameter
    if (argv.length < 3) {
        console.log(`InferJSCompiler format: node <InferJSCompilerPath> <Parameters>\nFor help: node <InferJSCompilerPath> -h`);
        process.exit(0);
    }

    // Create a shorthand list
    const shortList = {
        f: { name: 'action', value: 'parse-file' },
        d: { name: 'action', value: 'parse-dir' },
        a: { name: 'action', value: 'parse-list' },
        l: { name: 'action', value: 'parse-file-list' },
        h: 'help'
    };

    // Separate arguments
    const args = parseArgv(argv, shortList);

    // Check if help
    if (args.hasOwnProperty('help')) {
        console.log(`InferJSCompiler Help Menu:\n`);
        process.exit(0);
    }

    try {

        // Declare variables
        let input, inputOptions, output, outputOptions, ic, results;

        if (!args.hasOwnProperty('action')) throw new Error(`Missing action command`);

        switch (args['action'].toLowerCase()) {

            // Parses a single js file
            case 'parse-file':

                if (!args.hasOwnProperty('input-file')) throw new Error(`Missing required argument: <input-file> for parse-file`);

                input = args['input-file'];

                inputOptions = { encoding: 'utf8' };
                if (args.hasOwnProperty('input-file-options-encoding')) inputOptions['encoding'] = args['input-file-options-encoding'];

                outputOptions = { flag: "wx" };
                if (args.hasOwnProperty('output-file-options-flag')) outputOptions['flag'] = args['output-file-options-flag'];

                output = args['output-file'];
                if (!output || typeof output !== 'string' || output.trim() === '') {

                    // Output to input file directory
                    output = path.dirname(input) + '/output.mjs';
                }

                // Get class
                ic = new InferJSCompiler();

                // Async Parse file 
                results = await ic.parseFile(input, inputOptions, output, outputOptions).catch((err) => {
                    throw new Error(`Processing action parse-file had internal error: ${err}`);
                });

                break;

            // Parses a directory of file
            case 'parse-dir':

                if (!args.hasOwnProperty('input-dir')) throw new Error(`Missing required argument: <input-dir> for parse-dir`);

                input = args['input-dir'];

                inputOptions = { encoding: 'utf8', recursive: false, allowedExtensions: ["js", "mjs"] };
                if (args.hasOwnProperty('input-dir-options-recursive')) inputOptions['recursive'] = args['input-dir-options-recursive'];
                if (args.hasOwnProperty('input-dir-options-allowedExtensions')) inputOptions['allowedExtensions'] = args['input-dir-options-allowedExtensions'];

                outputOptions = { flag: "wx" };
                if (args.hasOwnProperty('output-file-options-flag')) outputOptions['flag'] = args['output-file-options-flag'];

                output = args['output-file'];
                if (!output || typeof output !== 'string' || output.trim() === '') {

                    // Output to input file directory
                    output = path.dirname(input) + '/output.mjs';
                }

                // Get class
                ic = new InferJSCompiler();

                // Async Parse file 
                results = await ic.parseDirectory(input, inputOptions, output, outputOptions).catch((err) => {
                    throw new Error(`Processing action parse-dir had internal error: ${err}`);
                });

                break;

            // Parses an arrray list of file paths
            case 'parse-list':

                if (!args.hasOwnProperty('input-list')) throw new Error(`Missing required argument: <input-list> for parse-list`);

                // Parse List
                input = args['input-list'].split(',').map(item => {

                    item = item.trim();

                    if (item.startsWith('"') && item.endsWith('"')) return item.slice(1, -1).trim();
                    if (item.startsWith('`') && item.endsWith('`')) return item.slice(1, -1).trim();
                    if (item.startsWith("'") && item.endsWith("'")) return item.slice(1, -1).trim();
                    if (item.startsWith("'")) return item.slice(1).trim();
                    if (item.endsWith("'")) return item.slice(0, -1).trim();

                    return item;
                });

                inputOptions = { encoding: 'utf8' };
                if (args.hasOwnProperty('input-list-options-recursive')) inputOptions['recursive'] = args['input-list-options-recursive'];
                if (args.hasOwnProperty('input-list-options-allowedExtensions')) inputOptions['allowedExtensions'] = args['input-list-options-allowedExtensions'];

                outputOptions = { flag: "wx" };
                if (args.hasOwnProperty('output-file-options-flag')) outputOptions['flag'] = args['output-file-options-flag'];

                output = args['output-file'];
                if (!output || typeof output !== 'string' || output.trim() === '') {

                    // Output to input file directory
                    output = path.dirname(input) + '/output.mjs';
                }

                // Get class
                ic = new InferJSCompiler();

                // Async Parse file 
                results = await ic.parseList(input, inputOptions, output, outputOptions).catch((err) => {
                    throw new Error(`Processing action parse-list had internal error: ${err}`);
                });

                break;

            // Parses a file list
            case 'parse-file-list':

                if (!args.hasOwnProperty('input-file-list')) throw new Error(`Missing required argument: <input-file-list> for parse-file-list`);

                // Parse List
                input = args['input-file-list'];

                inputOptions = { encoding: 'utf8' };
                if (args.hasOwnProperty('input-file-list-options-recursive')) inputOptions['recursive'] = args['input-file-list-options-recursive'];
                if (args.hasOwnProperty('input-file-list-options-allowedExtensions')) inputOptions['allowedExtensions'] = args['input-file-list-options-allowedExtensions'];

                outputOptions = { flag: "wx" };
                if (args.hasOwnProperty('output-file-options-flag')) outputOptions['flag'] = args['output-file-options-flag'];

                output = args['output-file'];
                if (!output || typeof output !== 'string' || output.trim() === '') {

                    // Output to input file directory
                    output = path.dirname(input) + '/output.mjs';
                }

                // Get class
                ic = new InferJSCompiler();

                // Async Parse file 
                results = await ic.parseFileList(input, inputOptions, output, outputOptions).catch((err) => {
                    throw new Error(`Processing action parse-list had internal error: ${err}`);
                });

                break;

            // No action return command format
            default: throw new Error(`Did not recognize action: ${args['action']}`);
        }

    } catch (err) {

        console.error(`InferJSCompiler ${err}\nFor help: node <InferJSCompilerPath> -h`);

    }
}

// Check if direct access or through class import
if (process && process.hasOwnProperty('argv') && typeof process.argv !== 'undefined') {

    // Call main
    main(process.argv);

}


