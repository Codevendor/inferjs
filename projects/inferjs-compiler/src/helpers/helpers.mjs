/** 
 * The helper methods for the inferjs-compiler.
 * @category helpers
 * @module inferjs-compiler
 */

// Helper Regex Constants
export {
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
    REG_INFER_PARSE_TAG_YIELDS

} from "./regex-const.mjs";

// Helper methods
export { buildInferObject } from "./build-infer-object.mjs";
export { getLineNumber } from "./get-line-number.mjs";
export { lstat } from "./lstat.mjs";
export { parseArgv } from "./parse-argv.mjs";
export { readDir } from "./read-dir.mjs";
export { readFile } from "./read-file.mjs";
export { type_of } from "./type-of.mjs";
export { writeFile } from "./write-file.mjs";