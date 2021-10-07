'use strict';
import * as fs from "fs"
let ws : any;
try {ws = fs.createWriteStream(process.env.OUTPUT_PATH)} catch(e){}
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

// Simulate input
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
    write(line + "\n")
}

function write(text: string){
    if(ws)
        ws.write(text)
    else process.stdout.write(text)
}

function end(){
    if(ws)
        ws.end()
    else
        process.stdout.end()
}

function solve(){

}

function parse(){

}

function main() {
    console.log(`console.log`) // Debug output
    writeLine(`writeLine`) // Challenge output
}




