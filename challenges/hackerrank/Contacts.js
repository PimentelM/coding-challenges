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

/*
 * Complete the 'contacts' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY queries as parameter.
 */


class Contacts {
    storage = {}

    addName(name) {
        let prefix = ""
        for (let letter of name) {
            prefix += letter

            if (!this.storage[prefix]) {
                this.storage[prefix] = {}
            }

            this.storage[prefix][name] = true;
        }

    }

    findPartial(partial) {
        let find = this.storage[partial]

        if(find){
            return Object.keys(find).length
        } else {
            return 0
        }
    }
}

function contacts(queries) {
    let result = [];
    // Write your code here

    let contacts = new Contacts()

    for (let query of queries){
        let [command, arg] = query
        if(command === "add"){
            contacts.addName(arg)
        } else {
            result.push(contacts.findPartial(arg))
        }
    }

    return result
}

function main() {
    let ws;
    if(process.env.LOCAL_PIMENTEL){
        ws = process.stdout
    } else {
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    const queriesRows = parseInt(readLine().trim(), 10);

    let queries = Array(queriesRows);

    for (let i = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const result = contacts(queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

if(process.env.LOCAL_PIMENTEL){
    inputString = `7
add ed
add eddie
add edward
find ed
add edwina
find edw
find a`


    inputString = inputString.split('\n');

    main();
}
