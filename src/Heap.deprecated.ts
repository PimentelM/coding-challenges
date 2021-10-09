import {BinaryNode} from "./BinaryNode";

// Data structure written by Mateus Pimentel
export class Heap {
    root: BinaryNode;
    nodeList : BinaryNode[] = [];
    type: "min" | "max";
    constructor(type: "min" | "max" = "min") {
        this.type = type;
    }

    // This operation is the same for max and min heap
    addNode(value: number, data: any = {}, parent: BinaryNode = this.root): void {
        // If root is not present, then add element as root.
        if (!this.root) {
            this.root = parent = new BinaryNode(value, data);
            return;
        }

        let nodes = [this.root]

        // If root is present, do a level search looking for the first node with an empty slot from left to right.

        let addedNode;
        while (nodes.length > 0) {
            let node = nodes.shift();

            if (node.hasLeftChild()) {
                nodes.push(node.left);
            } else {
                addedNode = node.addLeftNode(value, data)
                break;
            }

            if (node.hasRightChild()) {
                nodes.push(node.right);
            } else {
                addedNode = node.addRightNode(value, data)
                break;
            }

        }

        // Once the node is added, we need to bubble it up
        this.bubbleUpNode(addedNode);

        // Reference to the node slot, not the node + value ( since it may be bubbled up )
        // So we can have a structure like a sequential binary tree with the advantages of node abstraction
        this.nodeList.push(addedNode)
    }

    public count(){
        return this.nodeList.length
    }

    public isCorrect() : boolean{

        if(this.count() === 0 && this.root === undefined) return true


        let check = this.type === "min" ? this.isNodeValueSmallerThanChildren : this.isNodeValueGreaterThanChildren

        return this.root.executeForAllNodes(check).every(x=>x)

    }

    public peek() : {value: number, data: any} {
        return {
            value: this.root.value,
            data: this.root.data
        }
    }




    public poll() : {value: number, data: any} {
        let lastNodeInTheTree = this.nodeList.pop()
        let { value, data } = this.root

        if(this.root === lastNodeInTheTree){
            this.root = undefined
            return {
                value,data
            }
        }


        // Make root have the same value as the last added node
        this.root.swapValuesWith(lastNodeInTheTree)

        // Remove any references to the last node in his parent
        if(lastNodeInTheTree.parent.left === lastNodeInTheTree){
            lastNodeInTheTree.parent.left = undefined;
        } else if (lastNodeInTheTree.parent.right === lastNodeInTheTree) {
            lastNodeInTheTree.parent.right = undefined;
        }

        // Sift down the now root node
        this.siftDownNode(this.root)

        return {
            value,
            data
        }
    }

    public switchType() {
        this.type = this.type === "min" ? "max" : "min";
        this.heapfy()
    }

    private siftDownNode(node: BinaryNode){
        // Switch node positions with it's left child while it's value is:
        // Lesser than it's child when doing a MAX heap
        // Greater than it's child when doing a MIN heap

        if(!node.hasLeftChild()) return false

        let hasSiftedDown = false;

        while(node.hasAnyChild()){
            let childNode = node.left

            if(node.right){
                let chooseRightChild = this.type === "min" ? node.right.isSmallerThan(node.left) : node.right.isBiggerThan(node.left)
                if(chooseRightChild){
                    childNode = node.right
                }
            }

            let shouldSift = this.type === "min" ? childNode.isSmallerThan(node) :childNode.isBiggerThan(node)
            if (shouldSift){
                if (node.swapValuesWith(childNode)) {
                    node = childNode;
                    hasSiftedDown = true;
                }
            } else {
                break;
            }
        }

        return hasSiftedDown;

    }


    private bubbleUpNode(node: BinaryNode) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap

        if (!node.parent) return false;

        let hasBubbled = false;
        let hasToBubble = this.type === "min" ? this.isNodeValueSmallerThanParent : this.isNodeValueGreaterThanParent

        while (hasToBubble(node)) {
            if(!node.parent) break;
            if (node.swapValuesWith(node.parent)) {
                node = node.parent;
                hasBubbled = true;
            }
        }

        return hasBubbled;

    }

    private heapfy() {
        let didBuble = this.root
            .postOrderTraverse()
            .map(node => this.bubbleUpNode(node))
            .reduce((a, x) => a || x)

        if (didBuble) {
            this.heapfy()
        }
    }

    getSortedElements(){
        return this.root.levelOrderTraverse().sort((a,b)=>a.value - b.value)
    }

    isNodeValueSmallerThanChildren(node: BinaryNode): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (node.hasLeftChild()) {
            if (node.value > node.left.value) return false
        }

        if (node.hasRightChild()) {
            if (node.value > node.right.value) return false
        }

        return true
    }

    isNodeValueGreaterThanChildren(node: BinaryNode): boolean {
        if (node.hasLeftChild()) {
            if (node.value < node.left.value) return false
        }

        if (node.hasRightChild()) {
            if (node.value < node.right.value) return false
        }

        return true
    }

    isNodeValueSmallerThanParent(node: BinaryNode): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!node.parent) {
            return false
        }

        return node.value < node.parent.value
    }

    isNodeValueGreaterThanParent(node: BinaryNode): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!node.parent) {
            return false
        }

        return node.value > node.parent.value
    }

}
