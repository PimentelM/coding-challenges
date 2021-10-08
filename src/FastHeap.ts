import {BinaryNode} from "./BinaryNode";
import {add} from "husky";

// Data structure written by Mateus Pimentel
export class FastHeap {
    treeSequence : number[] = [];
    type: "min" | "max";
    constructor(type: "min" | "max" = "min") {
        this.type = type;
    }

    // This operation is the same for max and min heap
    addValue(value: number): void {
        this.treeSequence.push(value);

        // Once the node is added, we need to bubble it up
        this.bubbleUpNode(this.treeSequence.length - 1);
    }

    // TODO: Should check if return value is correct
    private siftDownNode(nodeIndex: number){
        // Switch node positions with it's left child while it's value is:
        // Lesser than it's child when doing a MAX heap
        // Greater than it's child when doing a MIN heap

        if(!this.hasLeft(nodeIndex)) return false

        let hasSiftedDown = false;

        while(this.hasLeft(nodeIndex)){
            let childIndex = this.getLeftIndex(nodeIndex)

            if(this.hasRight(nodeIndex)){
                let doChooseRightChild = this.type === "min" ?
                    this.getRightValue(nodeIndex) < this.getLeftValue(nodeIndex)
                    : this.getRightValue(nodeIndex) > this.getLeftValue(nodeIndex)
                if(doChooseRightChild){
                    childIndex = this.getRightIndex(nodeIndex)
                }
            }

            let shouldSift = this.type === "min" ?
                    this.getNodeValue(childIndex) < this.getNodeValue(nodeIndex)
                :   this.getNodeValue(childIndex) > this.getNodeValue(nodeIndex)

            if (shouldSift){
                if (this.swapValues(nodeIndex,childIndex)) {
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
    private bubbleUpNode(nodeIndex : number) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap

        if (!this.hasParent(nodeIndex)) return false;

        let hasBubbled = false;
        let hasToBubble = this.type === "min" ? (i : number) => this.isNodeValueSmallerThanParent(i) : (i: number) => this.isNodeValueGreaterThanParent(i)

        while (hasToBubble(nodeIndex)) {
            if(!this.hasParent(nodeIndex)) break;
            let parentIndex = this.getParentIndex(nodeIndex)
            if (this.swapValues(nodeIndex,parentIndex)) {
                nodeIndex = parentIndex
                hasBubbled = true;
            } else {
                break;
            }
        }

        return hasBubbled;

    }

    private heapfy() {

        let tree = this.treeSequence

        this.treeSequence = []

        tree.forEach(value=>{
            this.addValue(value)
        })


    }


    public peek() : number {
        return this.treeSequence[0]
    }

    public poll() : number {

        if(this.treeSequence.length === 0) throw new Error("Can't poll from empty heap")

        let lastValue = this.treeSequence.pop()

        if(this.treeSequence.length === 0) return lastValue


        let returnValue = this.treeSequence[0]

        this.treeSequence[0] = lastValue

        // Sift down the now root node
        this.siftDownNode(0)

        return returnValue;
    }

    // Tree sequence operations
    hasLeft(i : number){
        return this.getLeftValue(i) !== undefined
    }

    hasRight(i : number){
        return this.getRightValue(i) !== undefined
    }

    hasParent(i : number){
        return this.getParentValue(i) !== undefined
    }

    getLeftValue(i : number){
        return this.treeSequence[this.getLeftIndex(i)]
    }

    getRightValue(i : number){
        return this.treeSequence[this.getRightIndex(i)]
    }

    getParentValue(i: number){
        return this.treeSequence[this.getParentIndex(i)]
    }

    getLeftIndex(i : number){
        return i * 2 + 1
    }

    getRightIndex(i : number){
        return i * 2 + 2
    }

    getParentIndex(i : number){
        return Math.floor((i - 1) / 2)
    }

    getNodeValue(i : number){
        return this.treeSequence[i]
    }

    setNodeValue(i : number,value : number){
        this.treeSequence[i] = value
    }

    setLeftChildValue(i : number,value : number){
        this.setNodeValue(this.getLeftIndex(i),value)
    }

    setRightChildValue(i : number,value : number){
        this.setNodeValue(this.getRightIndex(i),value)
    }

    swapValues(nodeAIndex :number, nodeBIndex : number){
        let a = this.getNodeValue(nodeAIndex)
        let b = this.getNodeValue(nodeBIndex)

        if(a === undefined || b === undefined)
            return false

        this.setNodeValue(nodeAIndex,b)
        this.setNodeValue(nodeBIndex,a)

        return true
    }

    isNodeValueSmallerThanChildren(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getLeftValue(nodeIndex)) return false
        }

        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getRightValue(nodeIndex)) return false
        }


        return true
    }

    isNodeValueGreaterThanChildren(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getLeftValue(nodeIndex)) return false
        }

        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getRightValue(nodeIndex)) return false
        }


        return true
    }

    isNodeValueSmallerThanParent(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) < this.getParentValue(nodeIndex)
    }

    isNodeValueGreaterThanParent(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) > this.getParentValue(nodeIndex)
    }


    // Traverses

    inOrderTraverse(nodeIndex = 0) : number[]{
        let result = [];

        if (this.hasLeft(nodeIndex)){
            result.push(...this.inOrderTraverse(this.getLeftIndex(nodeIndex)))
        }

        result.push( nodeIndex )

        if(this.hasRight(nodeIndex)){
            result.push(...this.inOrderTraverse(this.getRightIndex(nodeIndex)))
        }


        return result
    }

    postOrderTraverse(nodeIndex = 0) : number[]{
        let result = [];

        if (this.hasLeft(nodeIndex)){
            result.push(...this.postOrderTraverse(this.getLeftIndex(nodeIndex)))
        }

        if(this.hasRight(nodeIndex)){
            result.push(...this.postOrderTraverse(this.getRightIndex(nodeIndex)))
        }

        result.push(nodeIndex)

        return result
    }

    levelOrderTraverse(): number[] {
        let result = [];

        let traverseQueue: number[] = [];

        let currentIndex: number = 0;

        while (currentIndex) {
            result.push(currentIndex)
            if (this.hasLeft(currentIndex)) traverseQueue.push(this.getLeftIndex(currentIndex));
            if (this.hasRight(currentIndex)) traverseQueue.push(this.getRightIndex(currentIndex));

            currentIndex = traverseQueue.shift();
        }

        return result;
    }


    // Test utils

    public count(){
        return this.treeSequence.length
    }

    public isCorrect() : boolean{

        if(this.count() === 0) return true

        let check = this.type === "min" ? (i : number) => this.isNodeValueSmallerThanChildren(i) :(i : number) => this.isNodeValueGreaterThanChildren(i)

        return this.treeSequence.map(check).every(x=>x)

    }

    public switchType() {
        this.type = this.type === "min" ? "max" : "min";
        this.heapfy()
    }

    getSortedElements(){
        return this.treeSequence.sort()
    }


}
