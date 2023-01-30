'use strict';

// Get js multi line comment tags
export const REG_JS_COMMENTS = /\/\*\*\s{0,}(.*?)\s{0,}\*\//gms;

// Get the @inferid
export const REG_INFER_ID = /@inferid\s{0,}([^\s]+)/ims;

// Split on any space
export const REG_SPLIT_ON_SPACE = /\s/ims;

// Fix multiline comments across tags.
export const REG_INFER_FIX_COMMENTS = /INFER:NL/gmis;

// Breaks apart the infer line into 5 groups.
export const REG_INFER_PARSE_TAG_INFER_LINE = /(@infer)\s{1,}{\({0,1}([^})(]+)\){0,1}}\s{1,}([^\s]+)\s{1,}{\({0,1}([^})(]+)\){0,1}}\s{0,}-{0,1}\s{0,}(.*)?/ims;

// Breaks apart the param line 
export const REG_INFER_PARSE_TAG_PARAM_LINE = /(@param)\s{1,}{\({0,1}([^}{)(]+)\){0,1}}\s{1,}(?=\[([^\]]+)\]\s{0,}-{0,1}\s{0,}(.*)?|([^\s]+)\s{0,}-{0,1}\s{0,}(.*)?)/ims;

// Parse Author
export const REG_INFER_PARSE_TAG_AUTHOR = /@author\s{1,}([^<]+)\s{1,}<([^>]+)>/ims;

// Parse borrows
export const REG_INFER_PARSE_TAG_BORROWS = /@borrows\s{1,}([^\s]+)\s{1,}as\s{1,}([^\s]+)/ims;

// Parse Enum
export const REG_INFER_PARSE_TAG_ENUM = /@enum\s{1,}\{{0,1}([^}{]+)\}{0,1}/ims;

// Parse Member 
export const REG_INFER_PARSE_TAG_MEMBER = /@member\s{1,}\{{0,1}([^}{]+)\}{0,1}\s{0,}([^\s]+)?/ims;

// Parse returns
export const REG_INFER_PARSE_TAG_RETURNS = /@returns\s{1,}\{{0,1}([^}{]+)\}{0,1}\s{0,}-{0,1}\s{0,}(.*)?/ims;

// Parse type
export const REG_INFER_PARSE_TAG_TYPE = /@type\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}/ims;

// Parse typedef
export const REG_INFER_PARSE_TAG_TYPEDEF = /@typedef\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}\s{1,}([^\s]+)/ims;

// Parse yields
export const REG_INFER_PARSE_TAG_YIELDS = /@yields\s{1,}\{{0,1}\({0,1}([^}{)(]+)\){0,1}\}{0,1}\s{0,}-{0,1}\s{0,}(.*)?/ims;