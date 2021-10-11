import {BinaryNode} from './BinaryNode';

// Data structure written by Mateus Pimentel
export class BinarySearchTree {
    root: BinaryNode;

    constructor() {
    }

    addNode(value: number, data: any = {}, parent: BinaryNode = this.root): void {
        if (!this.root) {
            this.root = parent = new BinaryNode(value, data);
            return;
        }

        if (value < parent.value) {
            if (!parent.hasLeftChild()) {
                parent.addLeftNode(value, data);
            } else {
                this.addNode(value, data, parent.left);
            }
        } else {
            if (!parent.hasRightChild()) {
                parent.addRightNode(value, data);
            } else {
                this.addNode(value, data, parent.right);
            }
        }
    }

    // TODO: Make it work, haha
    private deleteNodeWithValue(value: number): boolean {

        let node = this.findNodeWithValue(value);


        // No need to do further operations, just replace it with undefined
        if (node.hasNoChilds()) return undefined;

        // The original will be replaced with it's single children
        if (node.hasOneChild()) {

            let child = node.right || node.left;

            // swap child values with node
            child.swapValuesWith(node);

            // swap node's children with child's children
            node.left = child.left
            node.right = child.right

        }

        // The node will be replaced by the smallest left leaf of the right node
        if (node.hasBothChilds()) {
            let smallestChild; // from the right node

            let current = node.right;
            let isUsingLeftChild = false;
            while (current.hasLeftChild()) {
                current = node.left;
                isUsingLeftChild = true;
            }

            smallestChild = current;

            // Swap values with it
            smallestChild.swapValuesWith(node);


            // Remove child's reference
            if(isUsingLeftChild){
                smallestChild.parent.left = undefined
            } else {
                smallestChild.parent.right = undefined
            }







        }
    }

    findNodeWithValue(value: number, node: BinaryNode = this.root): BinaryNode {
        if (!node) return undefined;
        if (node.value === value) return node;

        return value < node.value ? this.findNodeWithValue(value, node.left) : this.findNodeWithValue(value, node.right);
    }
}
