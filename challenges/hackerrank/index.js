'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


function parse() {
    return undefined;
}

function solve(data) {
    return undefined;
}

function main() {
    let ws;
    if(process.env.LOCAL_PIMENTEL){
        ws = process.stdout
    } else {
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    let data = parse()


    let result = solve(data)


    ws.write(result.join('\n') + '\n');

    ws.end();
}

if(process.env.LOCAL_PIMENTEL){
    inputString = ``


    inputString = inputString.split('\n');

    main();
}
