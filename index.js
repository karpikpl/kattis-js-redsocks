/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();
    let line;

    while (line = readline()) {

        const input = line.split(' ');
        const p = parseInt(input[0]);
        const q = parseInt(input[1]);

        log(`Parsed input p: ${p} q: ${q}`);
        let isSolved = false;
        const max = 50000;
        const start = new Date();

        if (p === 0) {
            log('p == 0 - impossible')
            print('impossible');
            continue;
        }

        for (let x = 2; x <= max; x++) {

            if (isSolved) {
                break;
            }

            for (let n = Math.max(Math.floor(Math.sqrt(q*x*(x-1)/p))-1, x); n <= q * x / p; n++) {
                const prob = (x * (x - 1)) / (n * (n - 1));

                //log(`x:${x} n:${n}  prob:${prob} p/q:${p/q}`);

                if (prob == p / q) {
                    print(`${x} ${n-x}`);
                    log(`${x} ${n-x}`);
                    isSolved = true;
                    break;
                }

                if (prob < p / q) {
                    break;
                }

            }
        }

        if (!isSolved) {
            print('impossible');
            log('impossible')
        }

        log(`Solved p: ${p} q: ${q} in ${new Date() - start}`);
    }

    log(`Solved ALL in ${new Date() - startAll}`);
}

// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
