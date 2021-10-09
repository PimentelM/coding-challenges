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


class GraphNode {
    value;
    data;
    adjacencyTable = {} // { [id]: { node, weight } }
    isDirected = false;

    constructor(value, data = {}, isDirected = false) {
        this.isDirected = isDirected;
        this.value = value;
        this.data = data;
    }

    addAdjacent(node, weight){
        if(this.isAdjacent(node.value)) return;

        this.adjacencyTable[node.value] = {node, weight}

        if(!this.isDirected){
            node.addAdjacent(this,weight)
        }
    }

    getAdjacents(){
        return Object.values(this.adjacencyTable)
    }

    isAdjacent(nodeValue){
        return !!this.adjacencyTable[nodeValue]
    }

    findPathTo(destinationId, visited = {[this.value] : true}){
        let checkQueue = []

        if(this.isAdjacent(destinationId)){
            return [this.adjacencyTable[destinationId]]
        }

        // Add all nodes that can be visited to the check queue
        for(let {node: adjacentNode} of this.getAdjacents()){
            // Check if already visited this node
            if(visited[adjacentNode.value]){
                continue
            }

            // Mark the node as visited
            visited[adjacentNode.value] = true

            checkQueue.push(adjacentNode)
        }


        while(checkQueue[0]){
            let next = checkQueue.shift()

            let path = next.findPathTo(destinationId,visited)
            let weightToNext = this.adjacencyTable[next.value].weight
            if(path){
                return [{node: this, weight: weightToNext},...path]
            }
        }

        return undefined

    }

}

function findDistances(s, edges, numberOfNodes){
    console.log(`Starting node: ${s}`)
    console.log(`Edges:`, JSON.stringify(edges))
    console.log(`Number of nodes: ${numberOfNodes}`)

    let weight = 6

    // Our result
    let distances = new Array(numberOfNodes).fill(-1)

    // Translate from node ID to node object
    let nodeTable = {}

    // Initialize all Nodes
    for (let i = 1; i <= numberOfNodes; i++){
        nodeTable[i] = new GraphNode(i.toString())
    }

    // Add edges
    for (let [from,to] of edges){
        let nodeFrom = nodeTable[from]
        let nodeTo = nodeTable[to]

        nodeFrom.addAdjacent(nodeTo,weight)
    }


    let startingNode = nodeTable[s]



    // Ok, now we need to find the distance to all nodes from 1 to n

    // nodes that destination was found

    for(let i = 2; i <= numberOfNodes; i++){
        let path = startingNode.findPathTo(i)
        if(path){
            distances[i -1] = (path.length) * weight
        }
    }

    return distances
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
