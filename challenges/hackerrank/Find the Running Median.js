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



class MedianHeap{

    leftHeap = new Heap("max")
    rightHeap = new Heap("min")

    count = 0

    virtualMedian;

    getMedian(){
        if(this.count === 0) throw new Error("Has no values yet")

        if(this.virtualMedian === undefined) {
            return ( (this.leftHeap.peek().value + this.rightHeap.peek().value) / 2)
        } else return this.virtualMedian
    }

    addNode(number){
        // if is the first time
        if(this.count === 0){
            this.virtualMedian = number
            this.count++
            return number
        }

        if(this.count % 2 === 1){
            if(number > this.virtualMedian){
                this.rightHeap.addNode(number)
                this.leftHeap.addNode(this.virtualMedian)
            } else {
                this.leftHeap.addNode(number)
                this.rightHeap.addNode(this.virtualMedian)
            }

            this.virtualMedian = undefined
        }

        if(this.count % 2 === 0){
            let newVirtualMedian;

            if(number > this.getMedian()){
                this.rightHeap.addNode(number)
                newVirtualMedian = this.rightHeap.poll().value
            } else if (number < this.getMedian()){
                this.leftHeap.addNode(number)
                newVirtualMedian = this.leftHeap.poll().value
            } else {
                newVirtualMedian = number
            }

            this.virtualMedian = newVirtualMedian

        }



        this.count++

        return this.getMedian()
    }

}

/*
 * Complete the 'runningMedian' function below.
 *
 * The function is expected to return a DOUBLE_ARRAY.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function runningMedian(array) {
    let result = []

    let medianHeap = new MedianHeap()

    for(let n of array){
        result.push(medianHeap.addNode(n))
    }

    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const aCount = parseInt(readLine().trim(), 10);

    let a = [];

    for (let i = 0; i < aCount; i++) {
        const aItem = parseInt(readLine().trim(), 10);
        a.push(aItem);
    }

    const result = runningMedian(a);

    ws.write(result.join('\n') + '\n');

    ws.end();
}


// Data structure written by Mateus Pimentel
class BinaryNode {
    constructor(value, data, parent = undefined) {
        this.cache = {};
        this.parent = parent;
        this.value = value;
        this.data = data;
    }
    resetCache() {
        this.cache = {};
    }
    hasParent() {
        return !!this.parent;
    }
    hasNoChilds() {
        return !this.left && !this.right;
    }
    hasBothChilds() {
        return !!this.left && !!this.right;
    }
    hasOneChild() {
        return this.hasAnyChild() && !this.hasBothChilds();
    }
    hasAnyChild() {
        return !!this.left || !!this.right;
    }
    hasLeftChild() {
        return !!this.left;
    }
    hasRightChild() {
        return !!this.right;
    }
    setLeftChild(node) {
        this.left = node;
        if (node)
            node.setParent(this);
    }
    setRightChild(node) {
        this.right = node;
        if (node)
            node.setParent(this);
    }
    addRightNode(value, data = undefined) {
        if (this.right)
            throw new Error('Node already exists');
        return (this.right = new BinaryNode(value, data, this));
    }
    addLeftNode(value, data = undefined) {
        if (this.left)
            throw new Error('Node already exists');
        return (this.left = new BinaryNode(value, data, this));
    }
    setValue(value) {
        this.value = value;
    }
    setData(data) {
        this.data = data;
    }
    setParent(node) {
        this.parent = node;
    }
    isBiggerThan(node) {
        return this.value > node.value;
    }
    isSmallerThan(node) {
        return this.value < node.value;
    }
    // returns true when swap is executed successfully
    swapValuesWith(node) {
        if (!node)
            return false;
        let thisValue = this.value;
        let thisData = this.data;
        let nodeData = node.data;
        let nodeValue = node.value;
        this.value = nodeValue;
        this.data = nodeData;
        this.resetCache();
        node.value = thisValue;
        node.data = thisData;
        node.resetCache();
        return true;
    }
    getLevel(startingIndex = 1, useCache = false) {
        if (useCache && this.cache.level)
            return this.cache.level;
        if (!this.parent)
            return startingIndex;
        return (this.cache.level = this.parent.getLevel() + 1);
    }
    inOrderTraverse() {
        let result = [];
        // Traverse left node
        if (this.left) {
            result.push(...this.left.inOrderTraverse());
        }
        // Adds current value
        result.push(this);
        // Traverse Right Node
        if (this.right) {
            result.push(...this.right.inOrderTraverse());
        }
        return result;
    }
    preOrderTraverse() {
        let result = [];
        // Adds current value
        result.push(this);
        // Traverse left node
        if (this.left) {
            result.push(...this.left.preOrderTraverse());
        }
        // Traverse Right Node
        if (this.right) {
            result.push(...this.right.preOrderTraverse());
        }
        return result;
    }
    postOrderTraverse() {
        let result = [];
        // Traverse left node
        if (this.left) {
            result.push(...this.left.postOrderTraverse());
        }
        // Traverse Right Node
        if (this.right) {
            result.push(...this.right.postOrderTraverse());
        }
        // Adds current value
        result.push(this);
        return result;
    }
    levelOrderTraverse() {
        let result = [];
        let traverseQueue = [];
        let current = this;
        while (current) {
            result.push(current);
            if (current.left)
                traverseQueue.push(current.left);
            if (current.right)
                traverseQueue.push(current.right);
            current = traverseQueue.shift();
        }
        return result;
    }
    nodeCount() {
        return this.inOrderTraverse().length;
    }
    executeForAllNodes(action) {
        return this.levelOrderTraverse().map(action);
    }
    print(prefix = '', isTail = false) {
        let nodeType = !this.parent ? `-` : this.parent.right === this ? `r` : `l`;
        console.log(prefix + `|-${nodeType} ${this.value} {${this.getLevel()}}`);
        if (this.left) {
            this.left.print(prefix + (isTail ? '    ' : '|   '), !this.right);
        }
        if (this.right) {
            this.right.print(prefix + (isTail ? '    ' : '|   '), true);
        }
        // If it's root
        if (!this.parent)
            console.log(this.inOrderTraverse()
                .map(x => x.value)
                .join(' '));
    }
}

// Data structure written by Mateus Pimentel
class Heap {
    constructor(type = "min") {
        this.nodeList = [];
        this.type = type;
    }
    // This operation is the same for max and min heap
    addNode(value, data = {}, parent = this.root) {
        // If root is not present, then add element as root.
        if (!this.root) {
            this.root = parent = new BinaryNode(value, data);
            return;
        }
        let nodes = [this.root];
        // If root is present, do a level search looking for the first node with an empty slot from left to right.
        let addedNode;
        while (nodes.length > 0) {
            let node = nodes.shift();
            if (node.hasLeftChild()) {
                nodes.push(node.left);
            }
            else {
                addedNode = node.addLeftNode(value, data);
                break;
            }
            if (node.hasRightChild()) {
                nodes.push(node.right);
            }
            else {
                addedNode = node.addRightNode(value, data);
                break;
            }
        }
        // Once the node is added, we need to bubble it up
        this.bubbleUpNode(addedNode);
        // Reference to the node slot, not the node + value ( since it may be bubbled up )
        // So we can have a structure like a sequential binary tree with the advantages of node abstraction
        this.nodeList.push(addedNode);
    }
    count() {
        return this.nodeList.length;
    }
    isCorrect() {
        if (this.count() === 0 && this.root === undefined)
            return true;
        let check = this.type === "min" ? this.isNodeValueSmallerThanChildren : this.isNodeValueGreaterThanChildren;
        return this.root.executeForAllNodes(check).every(x => x);
    }
    peek() {
        return {
            value: this.root.value,
            data: this.root.data
        };
    }
    poll() {
        let lastNodeInTheTree = this.nodeList.pop();
        let { value, data } = this.root;
        if (this.root === lastNodeInTheTree) {
            this.root = undefined;
            return {
                value, data
            };
        }
        // Make root have the same value as the last added node
        this.root.swapValuesWith(lastNodeInTheTree);
        // Remove any references to the last node in his parent
        if (lastNodeInTheTree.parent.left === lastNodeInTheTree) {
            lastNodeInTheTree.parent.left = undefined;
        }
        else if (lastNodeInTheTree.parent.right === lastNodeInTheTree) {
            lastNodeInTheTree.parent.right = undefined;
        }
        // Sift down the now root node
        this.siftDownNode(this.root);
        return {
            value,
            data
        };
    }
    switchType() {
        this.type = this.type === "min" ? "max" : "min";
        this.heapfy();
    }
    siftDownNode(node) {
        // Switch node positions with it's left child while it's value is:
        // Lesser than it's child when doing a MAX heap
        // Greater than it's child when doing a MIN heap
        if (!node.hasLeftChild())
            return false;
        let hasSiftedDown = false;
        while (node.hasAnyChild()) {
            let childNode = node.left;
            if (node.right) {
                let chooseRightChild = this.type === "min" ? node.right.isSmallerThan(node.left) : node.right.isBiggerThan(node.left);
                if (chooseRightChild) {
                    childNode = node.right;
                }
            }
            let shouldSift = this.type === "min" ? childNode.isSmallerThan(node) : childNode.isBiggerThan(node);
            if (shouldSift) {
                if (node.swapValuesWith(childNode)) {
                    node = childNode;
                    hasSiftedDown = true;
                }
            }
            else {
                break;
            }
        }
        return hasSiftedDown;
    }
    bubbleUpNode(node) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap
        if (!node.parent)
            return false;
        let hasBubbled = false;
        let hasToBubble = this.type === "min" ? this.isNodeValueSmallerThanParent : this.isNodeValueGreaterThanParent;
        while (hasToBubble(node)) {
            if (!node.parent)
                break;
            if (node.swapValuesWith(node.parent)) {
                node = node.parent;
                hasBubbled = true;
            }
        }
        return hasBubbled;
    }
    heapfy() {
        let didBuble = this.root
            .postOrderTraverse()
            .map(node => this.bubbleUpNode(node))
            .reduce((a, x) => a || x);
        if (didBuble) {
            this.heapfy();
        }
    }
    getSortedElements() {
        return this.root.levelOrderTraverse().sort((a, b) => a.value - b.value);
    }
    isNodeValueSmallerThanChildren(node) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (node.hasLeftChild()) {
            if (node.value > node.left.value)
                return false;
        }
        if (node.hasRightChild()) {
            if (node.value > node.right.value)
                return false;
        }
        return true;
    }
    isNodeValueGreaterThanChildren(node) {
        if (node.hasLeftChild()) {
            if (node.value < node.left.value)
                return false;
        }
        if (node.hasRightChild()) {
            if (node.value < node.right.value)
                return false;
        }
        return true;
    }
    isNodeValueSmallerThanParent(node) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (!node.parent) {
            return false;
        }
        return node.value < node.parent.value;
    }
    isNodeValueGreaterThanParent(node) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (!node.parent) {
            return false;
        }
        return node.value > node.parent.value;
    }
}
