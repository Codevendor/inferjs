// Imports
import path from "node:path";

import {
    REG_JS_COMMENTS,
    REG_INFER_ID,
    REG_SPLIT_ON_SPACE,
    REG_INFER_FIX_COMMENTS,
    REG_INFER_PARSE_TAG_INFER_LINE,
    REG_INFER_PARSE_TAG_PARAM_LINE,
    REG_INFER_PARSE_TAG_AUTHOR,
    REG_INFER_PARSE_TAG_BORROWS,
    REG_INFER_PARSE_TAG_ENUM,
    REG_INFER_PARSE_TAG_MEMBER,
    REG_INFER_PARSE_TAG_RETURNS,
    REG_INFER_PARSE_TAG_TYPE,
    REG_INFER_PARSE_TAG_TYPEDEF,
    REG_INFER_PARSE_TAG_YIELDS,
    buildInferObject,
    getLineNumber,
    lstat,
    readDir,
    readFile,
    writeFile
} from "../helpers/helpers.mjs";

/**
 * The InferJSCompiler Class
 * @name InferJSCompiler
 * @version 0.0.2
 */
export class InferJSCompiler {

    // Private fields
    #source = null;

    /** Constructor for the InferJSCompiler. */
    constructor() {

        this.reset();

    }

    /** Resets the the InferJSCompiler. */
    reset() {

        this.#source = {
            globals: {},
            infers: {}
        };

    }

    /**
     * Parses a file that conatins an array list of input file paths and outputs an infer file.
     * @param {string} inputFileList - The filepath that contains an array list of file paths to input.
     * @param {object} inputFileOptions - The input list options for each input file.
     * @param {string} outputFile - The file path to create the infer file.
     * @param {object} outputFileOptions - The output file options.
     */
    async parseFileList(inputFileList, inputFileOptions, outputFile, outputFileOptions = {}) {

        // Check types
        if (typeof inputFileList !== 'string') throw new TypeError(`Incorrect type for method parseFileList, parameter inputFileList must be a string!`);
        if (typeof inputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFileList, parameter inputFileOptions must be an object!`);
        if (typeof outputFile !== 'string') throw new TypeError(`Incorrect type for method parseFileList, parameter outputFile must be an string!`);
        if (typeof outputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFileList, parameter outputFileOptions must be an object!`);

        // Check if inputFile is absolute path.
        if (!path.isAbsolute(inputFileList)) {
            inputFileList = path.resolve(inputFileList);
        }

        console.info()('INFERJS-COMPILER')(`Loading inputFileList: ${inputFileList} ...`);

        // Read in file
        const readResults = await readFile(inputFileList, inputFileOptions);

        // Throw Err
        if (!!readResults.err) throw readResults.err;

        // Convert readResults to string
        readResults.data = readResults.data.toString();

        // Split the file lines
        const lines = readResults.data.split("\n").map(item => item.trim());

        // Loop through file newlines
        for (let i = 0; i < lines.length; i++) {

            let inputFile = lines[i];

            // Check if inputFile is absolute path.
            if (!path.isAbsolute(inputFile)) {
                inputFile = path.resolve(inputFile);
            }

            console.info()('INFERJS-COMPILER')(`Loading file: ${inputFile} ...`);

            // Read in file
            const readResults2 = await readFile(inputFile, 'utf8');

            // Throw Err
            if (!!readResults2.err) throw readResults2.err;

            // Convert readResults2 to string
            readResults2.data = readResults2.data.toString();

            console.info()('INFERJS-COMPILER')(`Parsing file: ${inputFile} ...`);

            // Parse file to object
            this.#parse(inputFile, readResults2.data);

        }

        if (!path.isAbsolute(outputFile)) {
            outputFile = path.resolve(outputFile);
        }

        console.info()('INFERJS-COMPILER')(`Writing output file: ${outputFile} ...`);

        // Write file to output file with json
        const writeResults = await writeFile(outputFile, buildInferObject(this.#source, outputFileOptions?.['module']), outputFileOptions);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.info()('INFERJS-COMPILER')(`Finished`)

    }

    /**
     * Parses an array list of input file paths and outputs an infer file.
     * @param {array} inputList - The array list of file paths to input.
     * @param {object} inputFileOptions - The input list options for each input file.
     * @param {string} outputFile - The file path to create the infer file.
     * @param {object} outputFileOptions - The output file options.
     */
    async parseList(inputList, inputFileOptions, outputFile, outputFileOptions = {}) {

        // Check types
        if (typeof inputList !== 'object' || !Array.isArray(inputList)) throw new TypeError(`Incorrect type for method parseList, parameter inputList must be an array!`);
        if (typeof inputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseList, parameter inputFileOptions must be an object!`);
        if (typeof outputFile !== 'string') throw new TypeError(`Incorrect type for method parseList, parameter outputFile must be an string!`);
        if (typeof outputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseList, parameter outputFileOptions must be an object!`);

        console.info()('INFERJS-COMPILER')(`Loading inputList: ${inputList} ...`);

        for (let i = 0; i < inputList.length; i++) {

            // Get the file
            let inputFile = inputList[i];

            // Check if inputFile is absolute path.
            if (!path.isAbsolute(inputFile)) {
                inputFile = path.resolve(inputFile);
            }

            console.info()('INFERJS-COMPILER')(`Loading file: ${inputFile} ...`);

            // Read in file
            const readResults = await readFile(inputFile, inputFileOptions);

            // Throw Err
            if (!!readResults.err) throw readResults.err;

            // Convert readResults to string
            readResults.data = readResults.data.toString();

            console.info()('INFERJS-COMPILER')(`Parsing file: ${inputFile} ...`);

            // Parse file to object
            this.#parse(inputFile, readResults.data);

        }

        if (!path.isAbsolute(outputFile)) {
            outputFile = path.resolve(outputFile);
        }

        console.info()('INFERJS-COMPILER')(`Writing output file: ${outputFile} ...`);

        // Write file to output file with json
        const writeResults = await writeFile(outputFile, buildInferObject(this.#source, outputFileOptions?.['module']), outputFileOptions);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.info()('INFERJS-COMPILER')(`Finished`);

    }


    /**
     * The file to parse and look for infers.
     * @param {string} inputFile - The file path to parse.
     * @param {object} inputFileOptions - 
     * @param {string} outputFile - The file path to create the infer file.
     * @param {object} outputFileOptions - The output file options.
     */
    async parseFile(inputFile, inputFileOptions = { encoding: 'utf8' }, outputFile, outputFileOptions = {}) {

        // Check types
        if (typeof inputFile !== 'string') throw new TypeError(`Incorrect type for method parseFile, parameter inputFile must be a string!`);
        if (typeof inputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFile, parameter inputFileOptions must be an object!`);
        if (typeof outputFile !== 'string') throw new TypeError(`Incorrect type for method parseFile, parameter outputFile must be an string!`);
        if (typeof outputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFile, parameter outputFileOptions must be an object!`);

        // Check if inputFile is absolute path.
        if (!path.isAbsolute(inputFile)) {
            inputFile = path.resolve(inputFile);
        }

        console.info()('INFERJS-COMPILER')(`Loading file: ${inputFile}`);

        // Read in file
        const readResults = await readFile(inputFile, inputFileOptions);

        // Throw Err
        if (!!readResults.err) throw readResults.err;

        // Convert readResults to string
        readResults.data = readResults.data.toString();

        console.info()('INFERJS-COMPILER')(`Parsing file: ${inputFile}`);

        // Parse file to object
        this.#parse(inputFile, readResults.data);

        if (!path.isAbsolute(outputFile)) {
            outputFile = path.resolve(outputFile);
        }

        console.info()('INFERJS-COMPILER')(`Writing output file: ${outputFile}`);

        // Write file to output file with json
        const writeResults = await writeFile(outputFile, buildInferObject(this.#source, outputFileOptions?.['module']), outputFileOptions);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.info()('INFERJS-COMPILER')(`Finished`);
    }

    /**
     * Parses a directory looking for infers.
     * @param {string} inputDirectory - The directory path to parse.
     * @param {object} inputFileOptions - The file options for each file.
     * @param {string} outputFile - The file path to create the infer file.
     * @param {string} outputFileOptions - The file options for the outputfile.
     */
    async parseDirectory(inputDirectory, inputFileOptions = {}, outputFile, outputFileOptions = {}) {

        // Check types
        if (typeof inputDirectory !== 'string') throw new TypeError(`Incorrect type for method parseFile, parameter inputDirectory must be a string!`);
        if (typeof inputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFile, parameter inputFileOptions must be an object!`);
        if (typeof outputFile !== 'string') throw new TypeError(`Incorrect type for method parseFile, parameter outputFile must be an string!`);
        if (typeof outputFileOptions !== 'object') throw new TypeError(`Incorrect type for method parseFile, parameter outputFileOptions must be an object!`);

        // Check if inputDirectory is absolute path.
        if (!path.isAbsolute(inputDirectory)) {
            inputDirectory = path.resolve(inputDirectory);
        }

        // Get list of files for parsing
        const files = await this.#getDirectoryList(inputDirectory, inputFileOptions);

        for (let i = 0; i < files.length; i++) {

            let inputFile = files[i];

            // Check if inputFile is absolute path.
            if (!path.isAbsolute(inputFile)) {
                inputFile = path.resolve(inputFile);
            }

            console.info()('INFERJS-COMPILER')(`Loading file: ${inputFile} ...`);

            // Read in file
            const readResults = await readFile(inputFile, 'utf8');

            // Throw Err
            if (!!readResults.err) throw readResults.err;

            // Convert readResults to string
            readResults.data = readResults.data.toString();

            console.info()('INFERJS-COMPILER')(`Parsing file: ${inputFile} ...`);

            // Parse file to object
            this.#parse(inputFile, readResults.data);

        }

        if (!path.isAbsolute(outputFile)) {
            outputFile = path.resolve(outputFile);
        }

        console.info()('INFERJS-COMPILER')(`Writing output file: ${outputFile} ...`);

        // Write file to output file with json
        const writeResults = await writeFile(outputFile, buildInferObject(this.#source, outputFileOptions?.['module']), outputFileOptions);

        // Throw err
        if (!!writeResults.err) throw writeResults.err;

        console.info()('INFERJS-COMPILER')(`Finished`)
    }

    /**
     * Gets a directory list of sub folders and files.
     * @param {*} inputDirectory - The input directory to look in.
     * @param {*} inputFileOptions - The input directory options.
     * @returns 
     */
    async #getDirectoryList(inputDirectory, inputFileOptions) {

        // Holds the files
        let files = [];

        const dir = await readDir(inputDirectory);

        // Throw error
        if (!!dir.err) throw dir.err;

        // Loop through directory items
        for (let i = 0; i < dir.files.length; i++) {

            const item = dir.files[i];

            const itemPath = (inputDirectory.endsWith(path.sep)) ? inputDirectory + item : inputDirectory + path.sep + item;

            // Check if file or directory
            const results = await lstat(itemPath, {});

            // Throw error
            if (!!results.err) throw results.err;

            if (results.stats.isDirectory() && inputFileOptions.hasOwnProperty('recursive') && inputFileOptions.recursive.toString().toLowerCase() === 'true') {

                // Add recursive files to list;
                const rfiles = await this.#getDirectoryList(itemPath, inputFileOptions);
                files = files.concat(rfiles);
                continue;

            } else if (results.stats.isDirectory()) {

                continue;

            } else {

                // Only allow specific file extensions
                if (inputFileOptions) {

                    // Check allowed extensions
                    if (inputFileOptions.hasOwnProperty('allowedExtensions')) {

                        // Check if allowedExtensions is string or array of string;
                        if (typeof inputFileOptions.allowedExtensions === 'string') {

                            let item = inputFileOptions.allowedExtensions.trim().toLowerCase();

                            if (item && item[0] !== '.') item = '.' + item;

                            // Convert to array for checking
                            inputFileOptions.allowedExtensions = [item];

                        } else if (typeof inputFileOptions.allowedExtensions === 'object' && Array.isArray(inputFileOptions.allowedExtensions)) {

                            // Convert list to all lowercase
                            inputFileOptions.allowedExtensions = inputFileOptions.allowedExtensions.map(item => {
                                item = item.trim().toLowerCase();
                                if (item[0] !== '.') item = '.' + item;
                                return item;
                            });

                        } else {

                            // Throw error
                            throw new TypeError(`Method parseDirectory(inputFileOptions.allowedExtensions) must be a string or array of file extensions!`);

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
            const lineNumber = getLineNumber(fileData, jsComment);
            console.warn()('INFERJS-COMPILER')(`JS Comment missing tag @inferid on Line: ${lineNumber}\nFile: ${filePath}\nComment:\n${jsComment}`);
            return;
        }

        const inferid = m[1];

        // Check if inferid already exists
        if (this.#source.infers.hasOwnProperty(inferid)) {
            const lineNumber = getLineNumber(fileData, jsComment) + (getLineNumber(jsComment, m[1]) - 1);
            console.warn()('INFERJS-COMPILER')(`Tag @inferid with id (${inferid}), exists in multiple places! Please change one to a more unique id.`);
            console.warn()('INFERJS-COMPILER')(`on Line: ${this.#source.infers[inferid].line}, File: ${this.#source.infers[inferid].file}`);
            console.info()('INFERJS-COMPILER')(`on Line: ${lineNumber}, File: ${filePath}`);
            return;

        }

        // Get line of infer
        const lineNumber2 = getLineNumber(fileData, jsComment) + (getLineNumber(jsComment, m[0]) - 1);

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


    }


}



