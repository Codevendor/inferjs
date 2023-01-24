// Imports
import fs from "node:fs";
import path from "node:path";
import { argv } from "node:process";

// Get js multi line comment tags
const REG_JS_COMMENTS = /\/\*\*\s{0,}(.*?)\s{0,}\*\//gms;

// Get the @inferid
const REG_INFER_ID = /@inferid\s{0,}([^\s]+)/ims;

// Split on any space
const REG_SPLIT_ON_SPACE = /\s/ims;

// Fix multiline comments across tags.
const REG_INFER_FIX_COMMENTS = /INFER:NL/gmis;

// Breaks apart the infer line into 5 groups.
const REG_INFER_PARSE_TAG_INFER_LINE = /(@infer)\s{1,}{\({0,1}([^})(]+)\){0,1}}\s{1,}([^\s]+)\s{1,}{\({0,1}([^})(]+)\){0,1}}\s{0,}-{0,1}\s{0,}(.*)?/ims;

// Breaks apart the param line 
const REG_INFER_PARSE_TAG_PARAM_LINE = /(@param)\s{1,}{\({0,1}([^}{)(]+)\){0,1}}\s{1,}(?=\[([^\]]+)\]\s{0,}-{0,1}\s{0,}(.*)?|([^\s]+)\s{0,}-{0,1}\s{0,}(.*)?)/ims;

// Parse Author
const REG_INFER_PARSE_TAG_AUTHOR = /@author\s{1,}([^<]+)\s{1,}<([^>]+)>/ims;

// Parse borrows
const REG_INFER_PARSE_TAG_BORROWS = /@borrows\s{1,}([^\s]+)\s{1,}as\s{1,}([^\s]+)/ims;

// Parse Enum
const REG_INFER_PARSE_TAG_ENUM = /@enum\s{1,}\{{0,1}([^}{]+)\}{0,1}/ims;

// Parse Member 
const REG_INFER_PARSE_TAG_MEMBER = /@member\s{1,}\{{0,1}([^}{]+)\}{0,1}\s{0,}([^\s]+)?/ims;

// Parse returns
const REG_INFER_PARSE_TAG_RETURNS = /@returns\s{1,}\{{0,1}([^}{]+)\}{0,1}\s{0,}-{0,1}\s{0,}(.*)?/ims;

// Parse type
const REG_INFER_PARSE_TAG_TYPE = /@type\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}/ims;

// Parse typedef
const REG_INFER_PARSE_TAG_TYPEDEF = /@typedef\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}\s{1,}([^\s]+)/ims;

// Parse yields
const REG_INFER_PARSE_TAG_YIELDS = /@yields\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}\s{0,}-{0,1}\s{0,}(.*)?/ims;

export class InferCompiler {

    // Private fields
    #source = null;

    /** Constructor for the InferCompiler. */
    constructor() {

        this.#source = {
            globals: {},
            infers: {}
        };

    }

    /**
     * The fs.readdir() method is used to asynchronously read the contents of a given directory. The callback of this method returns an array of all the file names in the directory. The options argument can be used to change the format in which the files are returned from the method.
     * @param {string} path The path to the file to remove.
     * @returns {object} An object containing the results. 
     */
    static readDir(path) {

        return new Promise((resolve, reject) => {

            fs.readdir(path, (err, files) => {

                let o = {

                    "err": err,
                    "files": files

                };

                // Good resolve.
                resolve(o);

            });

        });
    }

    /**
     * Gets lstats on a file or folder.
     * @param {string} path The file or folder path to get stats from.
     * @param {object} options The options for optional parameters.
     * @returns {object} An object containing the results.
     */
    static lstat(path, options) {

        return new Promise((resolve, reject) => {

            fs.lstat(path, options, (err, stats) => {

                let o = {

                    "err": err,
                    "stats": stats

                };

                // Good resolve.
                resolve(o);

            });

        });

    }

    /**
     * 
     * @param {string} file The path to the file to read.
     * @param {string} encoding The encoding to read the file into.
     * @returns {object} An object containing the results.
     */
    static readFile(file, encoding) {

        return new Promise((resolve, reject) => {

            fs.readFile(file, encoding, function (err, data) {

                let o = {

                    "err": err,
                    "data": data

                };

                // Good resolve.
                resolve(o);

            });

        });

    }

    /**
     * 
     * @param {string} file The path to the file to write to.
     * @param {string} data The data to write.
     * @param {object} options The options for writing.
     * @returns {object} An object containing the results.
     */
    static writeFile(file, data, options) {

        return new Promise((resolve, reject) => {

            fs.writeFile(file, data, options, (err) => {

                let o = {

                    "err": err

                };

                // Good resolve.
                resolve(o);

            });

        });

    }

    /**
     * Gets the line number from the input by calculating newlines.
     * @param {string} input - The input to calculate from.
     * @param {string} word - The word to look for.
     * @returns {number} - The line number.
     */
    static getLineNumber(input, word) {

        const pos = input.indexOf(word);
        const sub = input.substring(0, pos);
        const newlines = sub.split("\n");
        return newlines.length;

    }

    /**
     * The file to parse and look for infers.
     * @param {string} inputFile - The file path to parse.
     * @param {string} outputFile - The file path to create the infer file.
     */
    async parseFile(inputFile, inputFileOptions = { encoding: 'utf8' }, outputFile, outputFileOptions = {}) {

        if (!path.isAbsolute(inputFile)) {
            inputFile = path.resolve(inputFile);
        }

        console.log(`Loading file: ${inputFile}...`);

        // Read in file
        const readResults = await InferCompiler.readFile(inputFile, inputFileOptions);

        // Throw Err
        if (!!readResults.err) throw readResults.err;

        console.log(`Parsing file: ${inputFile}...`);

        // Parse file to object
        this.#parse(inputFile, readResults.data);

        // Write file to output file with json
        const writeResults = await InferCompiler.writeFile(outputFile, JSON.stringify(this.#source), outputFileOptions);

        console.log(`Writing output file: ${outputFile}...`);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.log(`Finished`)
    }

    /**
     * Parses a directory looking for infers.
     * @param {string} inputDirectory - The directory path to parse.
     * @param {object} inputFileOptions - The file options for each file.
     * @param {string} outputFile - The file path to create the infer file.
     * @param {string} outputFileOptions - The file options for the outputfile.
     * @param {boolean} recursive - Whether to recursive through directory.
     */
    async parseDirectory(inputDirectory, inputFileOptions = {}, outputFile, outputFileOptions = {}, recursive = false) {

        if (!path.isAbsolute(inputDirectory)) {
            inputDirectory = path.resolve(inputDirectory);
        }

        // Get list of files for parsing
        const files = await this.#getDirectoryList(inputDirectory, inputFileOptions, recursive);

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            console.log(`Loading file: ${file}...`);

            // Read in file
            const readResults = await InferCompiler.readFile(file, 'utf8');

            // Throw Err
            if (!!readResults.err) throw readResults.err;

            console.log(`Parsing file: ${file}...`);

            // Parse file to object
            this.#parse(file, readResults.data);

        }

        // Write file to output file with json
        const writeResults = await InferCompiler.writeFile(outputFile, JSON.stringify(this.#source), outputFileOptions);

        console.log(`Writing output file: ${outputFile}...`);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.log(`Finished`)
    }

    /**
     * Gets a directory list of sub folders and files.
     * @param {*} inputDirectory - The input directory to look in.
     * @param {*} inputFileOptions - The input directory options.
     * @param {*} recursive - Whether to look in sub folders.
     * @returns 
     */
    async #getDirectoryList(inputDirectory, inputFileOptions, recursive = false) {

        // Holds the files
        let files = [];

        const dir = await InferCompiler.readDir(inputDirectory);

        // Throw error
        if (!!dir.err) throw dir.err;

        // Loop through directory items
        for (let i = 0; i < dir.files.length; i++) {

            const item = dir.files[i];

            const itemPath = (inputDirectory.endsWith(path.sep)) ? inputDirectory + item : inputDirectory + path.sep + item;

            // Check if file or directory
            const results = await InferCompiler.lstat(itemPath, {});

            // Throw error
            if (!!results.err) throw results.err;

            if (results.stats.isDirectory() && recursive) {

                // Add recursive files to list;
                const rfiles = await this.#getDirectoryList(itemPath, inputFileOptions, recursive);
                files = files.concat(rfiles);

            } else {

                // Only allow specific file extensions
                if (inputFileOptions) {

                    // Check allowed extensions
                    if (inputFileOptions.hasOwnProperty('allowedExtensions')) {

                        // Check if allowedExtensions is string or array of string;
                        if (typeof inputFileOptions.allowedExtensions === 'string') {

                            // Convert to array for checking
                            inputFileOptions.allowedExtensions = [inputFileOptions.allowedExtensions.toLowerCase()];

                        } else if (typeof inputFileOptions.allowedExtensions === 'object' && Array.isArray(inputFileOptions.allowedExtensions)) {

                            // Convert list to all lowercase
                            inputFileOptions.allowedExtensions = inputFileOptions.allowedExtensions.map(item => item.toLowerCase());

                        } else {

                            // Throw error
                            throw new TypeError(`Infer-Compiler error: method parseDirectory(inputFileOptions.allowedExtensions) must be a string or array of file extensions!`);

                        }

                        // Check if file is included
                        if (inputFileOptions.allowedExtensions.includes(path.extname(itemPath).toLowerCase())) files.push(itemPath);

                    } else {

                        files.push(itemPath);
                    }

                }

            }

        }

        return files;

    }

    /**
     * Parses the data into the private field #infers
     * @param {string} filePath - The file path
     * @param {string} fileData - The file data
     */
    #parse(filePath, fileData) {

        // Variables
        let m;

        // Find string js string infers
        while ((m = REG_JS_COMMENTS.exec(fileData)) !== null) {

            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === REG_JS_COMMENTS.lastIndex) {
                REG_JS_COMMENTS.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                if (groupIndex === 1) { this.#parseInfer(filePath, fileData, match) };
            });
        }

    }

    /**
     * Parses a js comment for infers.
     * @param {*} filePath - The path of the file being parsed.
     * @param {*} fileData - The data of the file being parsed.
     * @param {*} jsComment - The js comment being parsed.
     */
    #parseInfer(filePath, fileData, jsComment) {

        // Parse the @inferid
        const m = jsComment.match(REG_INFER_ID);
        if (!m || m.length !== 2 || m[1].trim() === '') {
            const lineNumber = InferCompiler.getLineNumber(fileData, jsComment);
            console.warn(`JS Comment missing tag @inferid on Line: ${lineNumber}\nFile: ${filePath}\nComment:\n${jsComment}`);
            return;
        }

        const inferid = m[1];

        // Check if inferid already exists
        if (this.#source.infers.hasOwnProperty(inferid)) {
            const lineNumber = InferCompiler.getLineNumber(fileData, jsComment) + (InferCompiler.getLineNumber(jsComment, m[1]) - 1);
            console.warn(`Tag @inferid with id (${inferid}), exists in multiple places! Please change one to a more unique id.`);
            console.warn(`on Line: ${this.#source.infers[inferid].line}, File: ${this.#source.infers[inferid].file}`);
            console.warn(`on Line: ${lineNumber}, File: ${filePath}`);
            return;

        }

        // Get line of infer
        const lineNumber2 = InferCompiler.getLineNumber(fileData, jsComment) + (InferCompiler.getLineNumber(jsComment, m[0]) - 1);

        // Add to infers
        this.#source.infers[inferid] = { file: filePath, line: lineNumber2, "@description": "", "@param": {} };

        // Split into lines for parsing
        const lines = jsComment.split("\n").map(item => item.trim());

        // Declare loop variables
        let match, line, line2, rawLine, tag, dvalue;
        let tagArr = [];
        let pname = '';
        let types = [];
        let infers = [];
        let pdesc = '';

        // Loop through comment lines for parsing
        for (let i = 0; i < lines.length; i++) {

            // Reset vars
            match = undefined;

            // Trim every line
            line = lines[i].trim();

            // Check if first character is *, remove
            if (line.length > 0 && line[0] === '*') line = line.slice(1).trimStart();

            // For raw line
            rawLine = line;

            // Parse tag items
            tagArr = line.split(REG_SPLIT_ON_SPACE, 2);
            tag = tagArr.shift();

            // Check tag exists
            if (tag) {

                // Convert tag to lowercase
                tag = tag.toLowerCase();

                // Check if multiline comment
                if (tag[0] === '@') {

                    for (let ii = i + 1; ii < lines.length; ii++) {

                        // Trim every line
                        line2 = lines[ii].trim();

                        // Check if first character is *, remove
                        if (line2.length > 0 && line2[0] === '*') line2 = line2.slice(1).trimStart();

                        // Check if not a property then has newlines
                        if (line2[0] !== '@') {

                            // Add special newline tag for replacing later in descriptions.
                            line += "INFER:NL" + line2;

                        } else {

                            // Forward index
                            i = ii - 1;
                            break;
                        }

                    }
                }

            }

            // Switch tag for parsing
            switch (tag) {

                // Do Nothing
                case undefined: break;

                case '@author':

                    match = rawLine.match(REG_INFER_PARSE_TAG_AUTHOR);
                    if (!match || match.length !== 3) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = { name: match[1], email: match[2] };
                    break;

                case '@borrows':

                    match = rawLine.match(REG_INFER_PARSE_TAG_BORROWS);
                    if (!match || match.length !== 3) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = { path1: match[1], path2: match[2] };
                    break;

                case '@enum':

                    match = rawLine.match(REG_INFER_PARSE_TAG_ENUM);
                    if (!match || match.length !== 2) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = match[1];
                    break;

                case '@var':
                case '@member':

                    match = rawLine.match(REG_INFER_PARSE_TAG_MEMBER);
                    if (!match) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = { type: (match.length == 2 && match[1]) ? match[1] : '', name: (match.length === 3 && match[2]) ? match[2] : '' };
                    break;

                case '@abstract':
                case '@async':
                case '@virtual':
                case '@generator':
                case '@global':
                case '@hideconstructor':
                case '@ignore':
                case '@inheritdoc':
                case '@inner':
                case '@instance':
                case '@override':
                case '@package':
                case '@private':
                case '@protected':
                case '@public':
                case '@readonly':
                case '@static':

                    this.#source.infers[inferid][tag] = true;
                    break;


                case '@access':
                case '@alias':
                case '@arguments':
                case '@callback':
                case '@class':
                case '@constructor':
                case '@classdesc':
                case '@constant':
                case '@constructs':
                case '@copyright':
                case '@default':
                case '@defaultvalue':
                case '@deprecated':
                case '@extends':
                case '@enum':
                case '@event':
                case '@exports':
                case '@external':
                case '@host':
                case '@fires':
                case '@emits':

                case '@category':
                case '@func':
                case '@method':
                case '@function':
                case '@implements':
                case '@interface':
                case '@kind':
                case '@lends':
                case '@listens':
                case '@memberof':
                case '@memberof!':
                case '@mixes':
                case '@mixin':
                case '@module':
                case '@name':
                case '@namespace':
                case '@requires':
                case '@see':
                case '@since':
                case '@this':
                case '@variation':
                case '@version':
                case '@inferid':

                    // Set into array
                    this.#source.infers[inferid][tag] = tagArr.shift().trim();

                    break;

                // Parse @param
                case '@param':

                    // Parse Match
                    match = line.match(REG_INFER_PARSE_TAG_PARAM_LINE);

                    // Must have 7 params
                    if (!match || match.length !== 7) break;

                    // Split types and trim
                    types = match[2].split('|').map(item => item.trim());

                    // Check match type for param name 
                    if (match[3]) {

                        // Split from default value
                        const keyvalue = match[3].split('=').map(item => item.trim());
                        pname = keyvalue.shift();
                        dvalue = keyvalue[0];
                        pdesc = (match[4] && typeof match[4] === 'string') ? match[4].trim() : '';

                    } else if (match[5]) {

                        pname = match[5].trim();
                        pdesc = (match[6] && typeof match[6] === 'string') ? match[6].trim() : '';

                    } else {
                        // None found
                        break;
                    }

                    if (!this.#source.infers[inferid]['@param'].hasOwnProperty(pname)) this.#source.infers[inferid]['@param'][pname] = {};
                    this.#source.infers[inferid]['@param'][pname]['description'] = pdesc.replace(REG_INFER_FIX_COMMENTS, "\n");
                    if (!this.#source.infers[inferid]['@param'][pname].hasOwnProperty('types')) this.#source.infers[inferid]['@param'][pname]['types'] = {};

                    types.forEach(tname => {
                        if (!this.#source.infers[inferid]['@param'][pname]['types'].hasOwnProperty(tname)) this.#source.infers[inferid]['@param'][pname]['types'][tname] = { "infers": {} };
                        this.#source.infers[inferid]['@param'][pname]['types'][tname]['default'] = dvalue;
                    });

                    break;

                // Parse '@infer'
                case '@infer':

                    // Parse Match
                    match = line.match(REG_INFER_PARSE_TAG_INFER_LINE);

                    // Must have 6 params
                    if (!match || match.length !== 6) break;

                    // Split types and trim
                    types = match[2].split('|').map(item => item.trim());

                    // Get the param name.
                    pname = match[3].trim();

                    // Split infers and trim
                    infers = match[4].split('|').map(item => item.trim());

                    // Get param description
                    pdesc = (match[5] && typeof match[5] === 'string') ? match[5].trim() : '';

                    if (!this.#source.infers[inferid]['@param'].hasOwnProperty(pname)) this.#source.infers[inferid]['@param'][pname] = {};
                    if (!this.#source.infers[inferid]['@param'][pname].hasOwnProperty('types')) this.#source.infers[inferid]['@param'][pname]['types'] = {};

                    types.forEach(tname => {

                        if (!this.#source.infers[inferid]['@param'][pname]['types'].hasOwnProperty(tname)) this.#source.infers[inferid]['@param'][pname]['types'][tname] = { "infers": {}, "default": undefined };

                        infers.forEach(infer => {

                            const items = infer.split('=').map(item => item.trim());
                            infer = items.shift();

                            if (!this.#source.infers[inferid]['@param'][pname]['types'][tname].hasOwnProperty(infer)) this.#source.infers[inferid]['@param'][pname]['types'][tname]['infers'][infer] = {};
                            if (!this.#source.infers[inferid]['@param'][pname]['types'][tname]['infers'][infer].hasOwnProperty('description')) this.#source.infers[inferid]['@param'][pname]['types'][tname]['infers'][infer]['description'] = pdesc.replace(REG_INFER_FIX_COMMENTS, "\n");
                            if (!this.#source.infers[inferid]['@param'][pname]['types'][tname]['infers'][infer].hasOwnProperty('value')) this.#source.infers[inferid]['@param'][pname]['types'][tname]['infers'][infer]['value'] = items[0];

                        });

                    });

                    break;


                case '@exception':
                case '@throws':
                case '@returns':

                    match = line.match(REG_INFER_PARSE_TAG_RETURNS);
                    if (!match || match.length !== 3) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = { type: match[1], "description": match[2].replace(REG_INFER_FIX_COMMENTS, "\n") };
                    break;

                case '@description':
                case '@desc':

                    this.#source.infers[inferid]['@description'] = line.replace(REG_INFER_FIX_COMMENTS, "\n").trim();
                    break;

                case '@todo':
                case '@fileoverview':
                case '@overview':
                case '@file':
                case '@example':
                case '@license':
                case '@summary':

                    this.#source.infers[inferid][tag] = line.split(tag, 2)[1].replace(REG_INFER_FIX_COMMENTS, "\n").trim();
                    break;

                case '@tutorial':

                    if (!this.#source.infers[inferid].hasOwnProperty(tag)) {
                        this.#source.infers[inferid][tag] = [];
                    }

                    this.#source.infers[inferid][tag].push(tagArr.shift().trim());
                    break;

                case '@type':

                    match = line.match(REG_INFER_PARSE_TAG_TYPE);
                    if (!match || match.length !== 2) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = match[1].split('|').map(item => item.trim());
                    break;

                case '@typedef':

                    match = line.match(REG_INFER_PARSE_TAG_TYPEDEF);
                    if (!match || match.length !== 3) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = {
                        type: match[1].split('|').map(item => item.trim()),
                        name: match[2]
                    };
                    break;

                case '@yields':

                    match = line.match(REG_INFER_PARSE_TAG_YIELDS);
                    if (!match || match.length !== 3) throw new SyntaxError();
                    this.#source.infers[inferid][tag] = {
                        type: match[1].split('|').map(item => item.trim()),
                        "description": match[2].replace(REG_INFER_FIX_COMMENTS, "\n")
                    };
                    break;

                // Parse Description
                default:

                    // Check if tagged unhandled
                    if (tag[0] === '@') {
                        this.#source.infers[inferid][tag] = new ReferenceError(`InferCompiler does not know how to process tag (${tag})!`);
                        break;
                    }

                    // Method signature
                    this.#source.infers[inferid]['@description'] += (this.#source.infers[inferid]['@description'].length === 0) ? line : "\n" + line;

                    break;

            }

        }

        //console.log('Found: ', this.#source.infers);

    }


}



console.log(process.argv);
console.log(path.resolve(process.argv[2]))

if (argv.length === 4) {
    
    const ic = new InferCompiler();
    ic.parseFile(argv[2], {encoding:'utf8'}, argv[3], {flag: "wx"});

}

//const ic = new InferCompiler();
//ic.parseDirectory('/home/administrator/Pictures', { allowedExtensions: '.js' }, '/home/administrator/Pictures/test.json', {}, true);
//ic.parseFile('/home/administrator/Pictures/test.js', {encoding:'utf8'}, '/home/administrator/Pictures/test.json', {});