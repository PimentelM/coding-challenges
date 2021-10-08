'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let ws;
try {
    ws = fs.createWriteStream(process.env.OUTPUT_PATH);
}
catch (e) { }
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let inputLines = [];
let currentLine = 0;
// Simulate input
let simulateInput = `1
3
1
2
3
2
3
4`;
let expectedOutput = `1 2 3 3 4 `;
// ####################################################
if (simulateInput) {
    inputLines = simulateInput.split(`\n`);
    main();
    end();
}
else {
    process.stdin.on('data', function (inputStdin) {
        inputString += inputStdin;
    });
    process.stdin.on('end', function () {
        inputLines = inputString.split('\n');
        inputString = '';
        main();
        end();
    });
}
function readLine() {
    return inputLines[currentLine++];
}
function writeLine(line) {
    write(line + "\n");
}
function write(text) {
    if (ws)
        ws.write(text);
    else
        process.stdout.write(text);
}
function end() {
    if (ws)
        ws.end();
    else
        process.stdout.end();
}
// ######################################################################
function solve() {
}
function parse() {
}
function main() {
    console.log(`console.log`); // Debug output
    writeLine(`writeLine`); // Challenge output
}
//# sourceMappingURL=index.js.map