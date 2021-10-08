import {BinaryNode} from "./BinaryNode";

// Data structure written by Mateus Pimentel
export class Heap {
    root: BinaryNode;

    constructor(private type: "min" | "max" = "min") {}

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
        while(nodes.length > 0) {
            let node = nodes.shift();

            if(node.hasLeftChild()) {
                nodes.push(node.left);
            } else {
                addedNode = node.addLeftNode(value,data)
                break;
            }

            if(node.hasRightChild()) {
                nodes.push(node.right);
            } else {
                addedNode = node.addRightNode(value,data)
                break;
            }

        }

        // Once the node is added, we need to bubble it up
        this.bubbleNode(addedNode);



    }

    isParentValueSmallerThanChildren(node: BinaryNode) : boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (node.hasLeftChild()){
            if(node.value > node.left.value) return false
        }

        if(node.hasRightChild()){
            if(node.value > node.right.value) return false
        }

        return true
    }

    isParentValueGreaterThanChildren(node: BinaryNode) : boolean {
        if (node.hasLeftChild()){
            if(node.value < node.left.value) return false
        }

        if(node.hasRightChild()){
            if(node.value < node.right.value) return false
        }

        return true
    }

    isNodeValueSmallerThanParent(node: BinaryNode) : boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!node.parent){
            return false
        }

        return node.value < node.parent.value
    }

    isNodeValueGreaterThanParent(node: BinaryNode) : boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (!node.parent){
            return false
        }

        return node.value > node.parent.value
    }

    private bubbleNode(node: BinaryNode) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap

        if(!node.parent) return false;

        let hasBubbled = false;
        let hasToBubble = this.type === "min" ? this.isNodeValueSmallerThanParent : this.isNodeValueGreaterThanParent

        while(hasToBubble(node)){
            if(swapValuesWithParent(node)){
                node = node.parent;
                hasBubbled = true;
            }
        }

        return hasBubbled;

        // returns true when swap is executed successfully
        // Like, we could be doing a reference swap, but that's a pain in the ass
        // So we are going to do a data swap with value and data fields being swapped.
        function swapValuesWithParent(node: BinaryNode) : boolean{
            let parent = node.parent;
            if(!parent) return false;



            let nodeValue = node.value;
            let nodeData = node.data;

            let parentData = parent.data;
            let parentValue = parent.value;

            node.value = parentValue;
            node.data = parentData;
            node.resetCache();

            parent.value = nodeValue;
            parent.data = parentData;
            node.resetCache();


            return true;
        }



    }
}
