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

class BinaryTreeNode {
    parent; // BinaryTreeNode;
    value; // Value
    right; // Right Node
    left; // Left Node

    isSwapped = false;

    cache = {};

    constructor(value,parent = undefined){
        this.parent = parent;
        this.value = value;
    }


    resetCache(){
        this.cache = {}
    }

    calcLevel(){
        if(this.cache.level) return this.cache.level;
        if(!this.parent) return 1

        return this.cache.level = this.parent.calcLevel() + 1
    }

    inOrderTraverse(){
        let result = [];

        // Traverse left node
        if (this.left){
            result.push(...this.left.inOrderTraverse())
        }

        // Adds current value
        result.push(this.value)

        // Traverse Right Node
        if (this.right){
            result.push(...this.right.inOrderTraverse())
        }

        return result
    }

    getAllNodes(){
        if(this.cache.allNodes) return this.cache.allNodes

        let result = [];

        // Traverse left node
        if (this.left){
            result.push(...this.left.getAllNodes())
        }

        // Adds current value
        result.push(this)

        // Traverse Right Node
        if (this.right){
            result.push(...this.right.getAllNodes())
        }

        this.cache.allNodes = result;
        return result
    }

    swap(){
        let left = this.left;
        let right = this.right;

        this.left = right;
        this.right = left;

        this.isSwapped = !this.isSwapped
    }

    resetSwap(){
        this.executeForAllNodes((node=>{
            if(node.isSwapped) node.swap()
        }))
    }

    executeForAllNodes(action){
        this.getAllNodes().map(action)
    }



    swapKDebug(k){
        console.log(`Swapping tree with K rule:`)
        console.log(`Tree before swap:`)
        this.print()
        console.log(`Nodes in all levels divisible by ${k} will be swapped`)
        this.executeForAllNodes(
            (node) => {
                if(node.calcLevel() % k === 0){
                    console.log(`Swapping node ${node.value} at level ${node.calcLevel()}`)
                    node.swap()
                }
            }
        )

        console.log(`Printing swapped tree:`)
        this.print()
    }

    swapK(k){
        this.executeForAllNodes(
            (node) => {
                if(node.calcLevel() % k === 0){
                    node.swap()
                }
            }
        )
    }


    print(prefix = "", isTail)
    {
        let nodeType =
            !this.parent ? `-` :
                (this.parent.right === this ? `r` : `l`)

        console.log(prefix + `|-${nodeType} ${this.value} {${this.calcLevel()}} ${
            this.isSwapped ? `*` : ``
        }` )


        if(this.left)
        {
            this.left.print(prefix + (isTail ? "    " : "|   "), !this.right )
        }

        if(this.right)
        {
            this.right.print(prefix + (isTail ?"    " : "|   "), true);
        }

        if(!this.parent) console.log(this.inOrderTraverse().join(" "))

    }

}


function swapNodes(indexes,queries){

    function hasLeft(i){
        return getLeftIndex(i) !== -1
    }

    function hasRight(i){
        return getRightIndex(i) !== -1
    }

    function getLeftIndex(i){
        return indexes[i-1][0]
    }

    function getRightIndex(i){
        return indexes[i-1][1]
    }


    // Initialize a binaryTree from the indexes data
    function makeTree(index = 1, parent = undefined){
        let node = new BinaryTreeNode(index,parent)

        if(hasLeft(index)){
            node.left = makeTree(getLeftIndex(index),node)
        }

        if(hasRight(index)){
            node.right = makeTree(getRightIndex(index),node)
        }

        return node
    }

    let tree = makeTree()


    return queries.map(k=>{
        tree.swapK(k);
        return tree.inOrderTraverse()
    })

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let indexes = Array(n);

    for (let i = 0; i < n; i++) {
        indexes[i] = readLine().replace(/\s+$/g, '').split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine().trim(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine().trim(), 10);
        queries.push(queriesItem);
    }

    const result = swapNodes(indexes, queries);

    ws.write(result.map(x => x.join(' ')).join('\n') + '\n');

    ws.end();
}
