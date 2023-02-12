'use strict';

// Color codes
const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";
const DIM = "\x1b[2m";
const UNDERCORE = "\x1b[4m";
const BLINK = "\x1b[5m";
const REVERSE = "\x1b[7m";
const HIDDEN = "\x1b[8m";

const FG_BLACK = "\x1b[30m";
const FG_RED = "\x1b[31m";
const FG_GREEN = "\x1b[32m";
const FG_YELLOW = "\x1b[33m";
const FG_BLUE = "\x1b[34m";
const FG_MAGENTA = "\x1b[35m";
const FG_CYAN = "\x1b[36m";
const FG_WHITE = "\x1b[37m";

const BG_BLACK = "\x1b[40m";
const BG_RED = "\x1b[41m";
const BG_GREEN = "\x1b[42m";
const BG_YELLOW = "\x1b[43m";
const BG_BLUE = "\x1b[44m";
const BG_MAGENTA = "\x1b[45m";
const BG_CYAN = "\x1b[46m";
const BG_WHITE = "\x1b[47m";

/**
 * Creates a custom colored terminal logger.
 */
export class logger {

    #session = [];
    #verbose = false;
    #format = false;

    #utcPrev = 0;

    #oldInfo = null;
    #oldLog = null;
    #oldWarn = null;
    #oldError = null;
    #oldTrace = null;
    #oldDebug = null;

    /** Returns the session. */
    get session() { return this.#session; }

    constructor(verbose = false, format = '') {

        this.#session = [];
        this.#verbose = verbose;
        this.#format = format;

        // Override console methods
        this.#oldInfo = console.info;
        this.#oldLog = console.log;
        this.#oldWarn = console.warn;
        this.#oldError = console.error;
        this.#oldTrace = console.trace;
        this.#oldDebug = console.debug;

        // Attach events
        console.info = this.#info.bind(this);
        console.log = this.#log.bind(this);
        console.warn = this.#warn.bind(this);
        console.error = this.#error.bind(this);
        console.trace = this.#trace.bind(this);
        console.debug = this.#debug.bind(this);

        const self = this;

        console.error = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#error(y, z);
                    }
                }
            }

            self.#oldError(...x);

        };

        console.log = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#log(y, z);
                    }
                }
            }

            self.#oldLog(...x);

        };

        console.info = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#info(y, z);
                    }
                }
            }

            self.#oldInfo(...x);

        };

        console.warn = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#warn(y, z);
                    }
                }
            }

            self.#oldWarn(...x);

        };

        console.debug = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#debug(y, z);
                    }
                }
            }

            self.#oldDebug(...x);

        };

        console.trace = (...x) => {

            if (x.length === 0) {
                return (y) => {
                    return (...z) => {
                        self.#trace(y, z);
                    }
                }
            }

            self.#oldTrace(...x);

        };

    }

    /** Resets the session. */
    reset() {
        this.#session = [];
    }

    /**
     * Calculates the milliseconds into shorthand string.
     * @param {number} ms - The milliseconds to caculate into shorthand string.
     * @returns {string} - The shorthand string.
     */
    #calculate_time(ms) {

        // Check types
        //const ms_type = helpers.expect(this.#calculate_time, 1, ms, ['number']);

        let ms2 = ((ms % 1000) / 100).toString().split('.');
        ms2 = (ms2.length > 1) ? ms2[1] : ms2[0];
        const secs = Math.floor((ms / 1000) % 60);

        return `+${secs}.${ms2}ms`;

    }

    #profiler(logType, label, args) {

        const obj = {};

        // Create date
        obj.utc = new Date();

        // Set args
        obj.logType = logType;
        obj.label = ` ${label} `;

        obj.args = args;

        // Calculate previous date
        const curr = Number(obj.utc);
        obj.diff = curr - this.#utcPrev;

        // Store new utc
        this.#utcPrev = curr;

        return obj;

    }

    /**
     * Writes the message to terminal.
     * @param {*} method 
     * @param {*} obj 
     * @param {*} message 
     */
    #write(method, obj, ...message) {

        // Add to session
        this.#session.push({ method: method.name, message: message });

        // Call internal method to display message.
        method(...message);
        if (this.#format) method(this.#format);
    }

    /**
     * Displays the message to the console.
     * @param {*} method - The method called.
     * @param {*} obj - The object for writing.
     */
    #display(method, obj) {

        if (!this.#verbose) return;

        const diff = this.#calculate_time(obj.diff);

        switch (method.name) {

            case 'info':

                this.#write(method, obj, ' ' + RESET + BG_CYAN + FG_BLACK + obj['label'] + RESET + FG_CYAN, ...obj.args, DIM + FG_WHITE + diff + RESET);
                break;

            case 'warn':

                this.#write(method, obj, ' ' + RESET + BG_YELLOW + FG_BLACK + obj['label'] + RESET + FG_YELLOW, ...obj.args, DIM + FG_WHITE + diff + RESET);
                break;

            case 'error':

                this.#write(method, obj, ' ' + RESET + BG_RED + FG_WHITE + obj['label'] + RESET + FG_RED, ...obj.args, RESET + DIM + FG_WHITE + diff + RESET);
                break;

            case 'trace':

                this.#write(method, obj, ' ' + RESET + BG_RED + FG_WHITE + obj['label'] + RESET + FG_RED, ...obj.args, RESET + DIM + FG_WHITE + diff + RESET);
                break;
            
            case 'debug':

                this.#write(method, obj, ' ' + RESET + BG_MAGENTA + FG_WHITE + obj['label'] + RESET + FG_MAGENTA, ...obj.args, RESET + DIM + FG_WHITE + diff + RESET);
                break;

            case 'log':

                this.#write(method, obj, RESET + FG_BLUE, ...obj.args, RESET + DIM + FG_WHITE + diff + RESET);
                break;

            default:

                this.#write(method, obj, ...obj.args);
                break;

        }

    }

    /** Writes info to console if verbose is true. */
    #info(label, args) {
        const obj = this.#profiler('info', label, args);
        this.#display(this.#oldInfo, obj);
    }

    /** Writes log to console if verbose is true. */
    #log(label, args) {
        const obj = this.#profiler('log', label, args);
        this.#display(this.#oldLog, obj);
    }

    /** Writes warn to console if verbose is true. */
    #warn(label, args) {
        const obj = this.#profiler('warn', label, args);
        this.#display(this.#oldWarn, obj);
    }

    /** Writes error to console if verbose is true. */
    #error(label, args) {
        const obj = this.#profiler('error', label, args);
        this.#display(this.#oldError, obj);
    }

    /** Writes error to console if verbose is true. */
    #debug(label, args) {
        const obj = this.#profiler('debug', label, args);
        this.#display(this.#oldDebug, obj);
    }

    /** Writes trace to console if verbose is true. */
    #trace(label, args) {
        const obj = this.#profiler('trace', label, args);
        this.#display(this.#oldTrace, obj);
    }

}