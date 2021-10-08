"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
const BinaryNode_1 = require("./BinaryNode");
// Data structure written by Mateus Pimentel
class BinarySearchTree {
    constructor() { }
    addNode(value, data = {}, parent = this.root) {
        if (!this.root) {
            this.root = parent = new BinaryNode_1.BinaryNode(value, data);
            return;
        }
        if (value < parent.value) {
            if (!parent.left) {
                parent.left = new BinaryNode_1.BinaryNode(value, data, parent);
            }
            else {
                this.addNode(value, data, parent.left);
            }
        }
        else {
            if (!parent.right) {
                parent.right = new BinaryNode_1.BinaryNode(value, data, parent);
            }
            else {
                this.addNode(value, data, parent.right);
            }
        }
    }
    // TODO: Make it work, haha
    deleteNodeWithValue(value, parent = this.root) {
        if (!parent)
            return false;
        if (parent.value === value && parent.calcLevel() === 1) {
            this.root = deleteNodeAndReturnReplacement(this.root, undefined);
            return true;
        }
        if (value < parent.value) {
            if (!parent.hasLeftChild())
                return false;
            if (parent.left.value === value) {
                parent.left = deleteNodeAndReturnReplacement(parent.left, parent);
                return true;
            }
            else {
                this.deleteNodeWithValue(value, parent.left);
            }
        }
        else {
            if (!parent.hasRightChild())
                return false;
            if (parent.right.value === value) {
                parent.right = deleteNodeAndReturnReplacement(parent.right, parent);
                return true;
            }
            else {
                this.deleteNodeWithValue(value, parent.right);
            }
        }
        function deleteNodeAndReturnReplacement(deletedNode, parent) {
            // No need to do further operations, just replace it with undefined
            if (deletedNode.hasNoChilds)
                return undefined;
            // The original will be replaced with it's single children
            if (deletedNode.hasOneChild) {
                let child = deletedNode.left || deletedNode.right;
                // Sets the child's grand parent as the new parent for the node, since it's parent is being deleted
                child.setParent(parent);
                // Return child, that will replace it's parent.
                return child;
            }
            // The node will be replaced by the smallest sub-children of the right node
            if (deletedNode.hasBothChilds) {
                let smallestChild; // from the right node
                let current = deletedNode.right;
                while (current.hasLeftChild()) {
                    current = deletedNode.left;
                }
                current.parent.left = undefined; // Removes the leaf reference
                smallestChild = current;
                smallestChild.setParent(parent);
                smallestChild.setLeftChild(deletedNode.left);
                smallestChild.setRightChild(deletedNode.right);
            }
        }
    }
    findNodeWithValue(value, node = this.root) {
        if (!node)
            return undefined;
        if (node.value === value)
            return node;
        return value < node.value ? this.findNodeWithValue(value, node.left) : this.findNodeWithValue(value, node.right);
    }
}
exports.BinarySearchTree = BinarySearchTree;
//# sourceMappingURL=BinarySearchTree.js.map