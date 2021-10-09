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

    leftHeap = new FastHeap("max")
    rightHeap = new FastHeap("min")

    count = 0

    virtualMedian;

    getMedian(){
        if(this.count === 0) throw new Error("Has no values yet")

        if(this.virtualMedian === undefined) {
            return ( (this.leftHeap.peek() + this.rightHeap.peek()) / 2)
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
                this.rightHeap.addValue(number)
                this.leftHeap.addValue(this.virtualMedian)
            } else {
                this.leftHeap.addValue(number)
                this.rightHeap.addValue(this.virtualMedian)
            }

            this.virtualMedian = undefined
        }

        if(this.count % 2 === 0){
            let newVirtualMedian;

            if(number > this.getMedian()){
                this.rightHeap.addValue(number)
                newVirtualMedian = this.rightHeap.poll()
            } else if (number < this.getMedian()){
                this.leftHeap.addValue(number)
                newVirtualMedian = this.leftHeap.poll()
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
class FastHeap {
    constructor(type = "min") {
        this.treeSequence = [];
        this.dataForIndex = [];
        this.type = type;
    }

    // This operation is the same for max and min heap
    addValue(value, data = undefined) {
        this.treeSequence.push(value);
        this.dataForIndex.push(value);
        // Once the node is added, we need to bubble it up
        this.bubbleUpNode(this.treeSequence.length - 1);
    }

    // TODO: Should check if return value is correct
    siftDownNode(nodeIndex) {
        // Switch node positions with it's left child while it's value is:
        // Lesser than it's child when doing a MAX heap
        // Greater than it's child when doing a MIN heap
        if (!this.hasLeft(nodeIndex))
            return false;
        let hasSiftedDown = false;
        while (this.hasLeft(nodeIndex)) {
            let childIndex = this.getLeftIndex(nodeIndex);
            if (this.hasRight(nodeIndex)) {
                let doChooseRightChild = this.type === "min" ?
                    this.getRightValue(nodeIndex) < this.getLeftValue(nodeIndex)
                    : this.getRightValue(nodeIndex) > this.getLeftValue(nodeIndex);
                if (doChooseRightChild) {
                    childIndex = this.getRightIndex(nodeIndex);
                }
            }
            let shouldSift = this.type === "min" ?
                this.getNodeValue(childIndex) < this.getNodeValue(nodeIndex)
                : this.getNodeValue(childIndex) > this.getNodeValue(nodeIndex);
            if (shouldSift) {
                if (this.swapValues(nodeIndex, childIndex)) {
                    nodeIndex = childIndex;
                    hasSiftedDown = true;
                }
            } else {
                break;
            }
        }
        return hasSiftedDown;
    }

    // TODO: Should check if return value is correct
    bubbleUpNode(nodeIndex) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap
        if (!this.hasParent(nodeIndex))
            return false;
        let hasBubbled = false;
        let hasToBubble = this.type === "min" ? (i) => this.isNodeValueSmallerThanParent(i) : (i) => this.isNodeValueGreaterThanParent(i);
        while (hasToBubble(nodeIndex)) {
            if (!this.hasParent(nodeIndex))
                break;
            let parentIndex = this.getParentIndex(nodeIndex);
            if (this.swapValues(nodeIndex, parentIndex)) {
                nodeIndex = parentIndex;
                hasBubbled = true;
            } else {
                break;
            }
        }
        return hasBubbled;
    }

    heapfy() {
        let tree = this.treeSequence;
        let data = this.dataForIndex;
        this.treeSequence = [];
        this.dataForIndex = [];
        let i = 0;
        tree.forEach(value => {
            i++;
            this.addValue(value, data[i]);
        });
    }

    peek(getData = false) {
        if (getData) {
            return {
                value: this.treeSequence[0],
                data: this.dataForIndex[0]
            };
        }
        return this.treeSequence[0];
    }

    poll(getData = false) {
        if (this.treeSequence.length === 0)
            throw new Error("Can't poll from empty heap");
        let lastValue = this.treeSequence.pop();
        let lastData = this.dataForIndex.pop();
        if (this.treeSequence.length === 0)
            if (getData) {
                return {
                    value: lastValue,
                    data: lastData
                };
            } else
                return lastValue;
        let returnValue = this.treeSequence[0];
        let returnData = this.dataForIndex[0];
        this.treeSequence[0] = lastValue;
        this.dataForIndex[0] = lastData;
        // Sift down the now root node
        this.siftDownNode(0);
        if (getData) {
            return {
                value: returnValue,
                data: returnData
            };
        } else
            return returnValue;
    }

    // Tree sequence operations
    hasLeft(i) {
        return this.getLeftValue(i) !== undefined;
    }

    hasRight(i) {
        return this.getRightValue(i) !== undefined;
    }

    hasParent(i) {
        return this.getParentValue(i) !== undefined;
    }

    getLeftValue(i) {
        return this.treeSequence[this.getLeftIndex(i)];
    }

    getRightValue(i) {
        return this.treeSequence[this.getRightIndex(i)];
    }

    getParentValue(i) {
        return this.treeSequence[this.getParentIndex(i)];
    }

    getLeftIndex(i) {
        return i * 2 + 1;
    }

    getRightIndex(i) {
        return i * 2 + 2;
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getNodeValue(i) {
        return this.treeSequence[i];
    }

    getNodeData(i) {
        return this.dataForIndex[i];
    }

    setNodeValue(i, value) {
        this.treeSequence[i] = value;
    }

    setNodeData(i, data) {
        this.dataForIndex[i] = data;
    }

    setLeftChildValue(i, value) {
        this.setNodeValue(this.getLeftIndex(i), value);
    }

    setRightChildValue(i, value) {
        this.setNodeValue(this.getRightIndex(i), value);
    }

    swapValues(nodeAIndex, nodeBIndex) {
        let a = this.getNodeValue(nodeAIndex);
        let b = this.getNodeValue(nodeBIndex);
        let dataA = this.getNodeData(nodeAIndex);
        let dataB = this.getNodeData(nodeBIndex);
        if (a === undefined || b === undefined)
            return false;
        this.setNodeValue(nodeAIndex, b);
        this.setNodeValue(nodeBIndex, a);
        this.setNodeData(nodeAIndex, dataB);
        this.setNodeData(nodeBIndex, dataA);
        return true;
    }

    isNodeValueSmallerThanChildren(nodeIndex) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getLeftValue(nodeIndex))
                return false;
        }
        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getRightValue(nodeIndex))
                return false;
        }
        return true;
    }

    isNodeValueGreaterThanChildren(nodeIndex) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getLeftValue(nodeIndex))
                return false;
        }
        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getRightValue(nodeIndex))
                return false;
        }
        return true;
    }

    isNodeValueSmallerThanParent(nodeIndex) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (!this.hasParent(nodeIndex)) {
            return false;
        }
        return this.getNodeValue(nodeIndex) < this.getParentValue(nodeIndex);
    }

    isNodeValueGreaterThanParent(nodeIndex) {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.
        if (!this.hasParent(nodeIndex)) {
            return false;
        }
        return this.getNodeValue(nodeIndex) > this.getParentValue(nodeIndex);
    }

    // Traverses
    inOrderTraverse(nodeIndex = 0) {
        let result = [];
        if (this.hasLeft(nodeIndex)) {
            result.push(...this.inOrderTraverse(this.getLeftIndex(nodeIndex)));
        }
        result.push(nodeIndex);
        if (this.hasRight(nodeIndex)) {
            result.push(...this.inOrderTraverse(this.getRightIndex(nodeIndex)));
        }
        return result;
    }

    postOrderTraverse(nodeIndex = 0) {
        let result = [];
        if (this.hasLeft(nodeIndex)) {
            result.push(...this.postOrderTraverse(this.getLeftIndex(nodeIndex)));
        }
        if (this.hasRight(nodeIndex)) {
            result.push(...this.postOrderTraverse(this.getRightIndex(nodeIndex)));
        }
        result.push(nodeIndex);
        return result;
    }

    levelOrderTraverse() {
        let result = [];
        let traverseQueue = [];
        let currentIndex = 0;
        while (currentIndex) {
            result.push(currentIndex);
            if (this.hasLeft(currentIndex))
                traverseQueue.push(this.getLeftIndex(currentIndex));
            if (this.hasRight(currentIndex))
                traverseQueue.push(this.getRightIndex(currentIndex));
            currentIndex = traverseQueue.shift();
        }
        return result;
    }

    // Test utils
    count() {
        return this.treeSequence.length;
    }

    isCorrect() {
        if (this.count() === 0)
            return true;
        let check = this.type === "min" ? (i) => this.isNodeValueSmallerThanChildren(i) : (i) => this.isNodeValueGreaterThanChildren(i);
        return this.treeSequence.map(check).every(x => x);
    }

    switchType() {
        this.type = this.type === "min" ? "max" : "min";
        this.heapfy();
    }
}

