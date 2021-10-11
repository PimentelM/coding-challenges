'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'searchSuggestions' function below.
 *
 * The function is expected to return a 2D_STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY repository
 *  2. STRING customerQuery
 */

function searchSuggestions(repository, customerQuery) {
    let repoMap = {}
    repository = repository.sort()

    // Build repoistory map of possible queries
    for (let word of repository){
        let prefix= ""
        let c = 0;
        for (let char of word.toLowerCase()){
            prefix += char
            if(prefix.length<=2) continue;
            if(!repoMap[prefix]) repoMap[prefix] = []

            repoMap[prefix].push(word)

        }
    }


    // Query results
    let results = []

    let query = ""
    for (let char of customerQuery.toLowerCase()){
        query += char;
        if(query.length < 2) continue

        // If there are no results, then continue...
        if(!repoMap[query]) {
            results.push([])
            continue
        }

        // Query
        let result = repoMap[query].slice(0,3)

        results.push(result)
    }


    return results;



}

function main() {
    let ws;
    if(process.env.LOCAL_PIMENTEL){
        ws = process.stdout
    } else {
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    const repositoryCount = parseInt(readLine().trim(), 10);

    let repository = [];

    for (let i = 0; i < repositoryCount; i++) {
        const repositoryItem = readLine();
        repository.push(repositoryItem);
    }

    const customerQuery = readLine();

    const result = searchSuggestions(repository, customerQuery);

    ws.write(result.map(x => x.join(' ')).join('\n') + '\n');

    ws.end();
}


if(process.env.LOCAL_PIMENTEL){
    inputString = `5
code
codePhone
coddle
coddles
codes
coddle`


    inputString = inputString.split('\n');

    main();
}
