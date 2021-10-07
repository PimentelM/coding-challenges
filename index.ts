'use strict';
import * as fs from "fs"
const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

let simulateInput = ``

if(simulateInput){
    inputLines = simulateInput.split(`\n`)
    main();
    end();
} else {
    process.stdin.on('data', function(inputStdin: string): void {
        inputString += inputStdin;
    });

    process.stdin.on('end', function(): void {
        inputLines = inputString.split('\n');
        inputString = '';
        main();
        end();
    });
}

function readLine(): string {
    return inputLines[currentLine++];
}

function writeLine(line: string){
    ws.write(line + "\n")
}

function write(text: string){
    ws.write(text)
}

function end(){
    ws.end()
}

function solve(){

}

function parse(){

}

function main() {
    console.log(`console.log`)
    writeLine(`writeLine`)
    writeLine(readLine())
}




