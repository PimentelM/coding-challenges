// noinspection JSUnresolvedVariable

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

function findDistances(startingNode, edges, numberOfNodes){
    console.log(`Starting node: ${startingNode}`)
    console.log(`Edges:`, JSON.stringify(edges))
    console.log(`Number of nodes: ${numberOfNodes}`)

    let graph = {}

    let distances = new Array(numberOfNodes).fill(-1)

    let i = 0
    while(i<numberOfNodes){
        graph[i] = []
    }

    for(let edge of edges){
        graph[edge[0]].push(edge[1])
        graph[edge[1]].push(edge[0])
    }




    return []
}

function parse(){

    const quantityOfQueries = parseInt(readLine().trim(), 10);

    let queries = Array(quantityOfQueries);

    for (let i = 0; i < quantityOfQueries; i++) {

        let [numberOfNodes, numberOfEdges] = readLine().trim().split(" ").map(Number)

        let e = Array(numberOfEdges)

        for(let j = 0; j < numberOfEdges; j++){
            e[j] = readLine().trim().split(" ").map(Number)
        }

        let s = Number(readLine().trim())

        let n = numberOfNodes

        queries[i] = {
            s,e,n
        }
    }

    return queries

}



function main() {
    let ws;
    if(process.env.LOCAL_PIMENTEL){
        ws = process.stdout
    } else {
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    let queries = parse()
    let result = []
    for ( let query of queries){
        result.push(findDistances(query.s,query.e, query.n))
    }


    result.forEach(result=>{
        ws.write(result.join(" ") + "\n")
    })


    ws.end();
}

if(process.env.LOCAL_PIMENTEL){
    inputString = `2
4 2
1 2
1 3
1
3 1
2 3
2`


    inputString = inputString.split('\n');

    main();
}
