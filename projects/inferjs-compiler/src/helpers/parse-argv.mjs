'use strict';

/**
 * Parses a command line into arguments.
 * @param {array} src - The command line to parse argv.
 * @param {object} shortHandList - The command short hand list.
 */
export function parseArgv(src, shortHandList = {}) {

    // Set fields
    const args = {};

    // Set fields
    args['$node'] = src.shift();
    args['$infercompiler'] = src.shift();

    // Loop through all possible matches
    for (let i = 0; i < src.length; i++) {

        // Get argument
        const arg = src[i].trim();

        if (arg.startsWith('--')) {

            // parse double --
            const pair = arg.split("=", 2).map(item => item.trim());

            if (!pair || pair.length === 0 || pair[0] === '$') continue;

            const name = pair[0].slice(2);

            if (pair.length === 2) {

                // Check for quote strings
                if (pair[1].startsWith('"') && pair[1].endsWith('"')) { args[name] = pair[1].slice(1, -1); continue; }
                if (pair[1].startsWith("'") && pair[1].endsWith("'")) { args[name] = pair[1].slice(1, -1); continue; }
                if (pair[1].startsWith('`') && pair[1].endsWith('`')) { args[name] = pair[1].slice(1, -1); continue; }
                args[name] = pair[1];

            } else {
                args[name] = true;
            }

            //args[] = (pair.length === 2) ? pair[1] : true;

        } else if (arg.startsWith('-')) {

            // parse double --
            const pair2 = arg.split("=", 2).map(item => item.trim());

            if (!pair2 || pair2.length === 0 || pair2[0] === '$') continue;

            const name2 = pair2[0].slice(1);

            // Check for multi command
            if (pair2.length === 1) {

                // Split into single commands
                name2.split('').map(item => {

                    // Check if shorthand
                    if (shortHandList.hasOwnProperty(item)) {

                        // Get the short
                        const short = shortHandList[item];

                        if (typeof short === 'object' && short.hasOwnProperty('name') && short.hasOwnProperty('value')) {
                            args[short.name] = short.value;
                            return;
                        }

                        item = shortHandList[item];
                    }

                    // Just set command
                    args[item] = true;
                });

            } else {

                if (pair2.length === 2) {

                    // Check for quote strings
                    if (pair2[1].startsWith('"') && pair2[1].endsWith('"')) { args[name2] = pair2[1].slice(1, -1); continue; }
                    if (pair2[1].startsWith("'") && pair2[1].endsWith("'")) { args[name2] = pair2[1].slice(1, -1); continue; }
                    if (pair2[1].startsWith('`') && pair2[1].endsWith('`')) { args[name2] = pair2[1].slice(1, -1); continue; }
                    args[name2] = pair2[1];


                } else {
                    args[name2] = true;
                }
            }

        } else {

            if (arg[0] === '$') continue;

            // parse normal
            args[arg] = true;

        }

    }

    return args;

}