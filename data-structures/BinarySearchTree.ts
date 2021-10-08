import { BinaryNode } from './BinaryNode';

// Data structure written by Mateus Pimentel
export class BinarySearchTree {
  root: BinaryNode;

  constructor() {}

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
  private deleteNodeWithValue(value: number, parent: BinaryNode = this.root): boolean {
    if (!parent) return false;

    if (parent.value === value && parent.getLevel() === 1) {
      this.root = deleteNodeAndReturnReplacement(this.root, undefined);
      return true;
    }

    if (value < parent.value) {
      if (!parent.hasLeftChild()) return false;

      if (parent.left.value === value) {
        parent.left = deleteNodeAndReturnReplacement(parent.left, parent);
        return true;
      } else {
        this.deleteNodeWithValue(value, parent.left);
      }
    } else {
      if (!parent.hasRightChild()) return false;

      if (parent.right.value === value) {
        parent.right = deleteNodeAndReturnReplacement(parent.right, parent);
        return true;
      } else {
        this.deleteNodeWithValue(value, parent.right);
      }
    }

    function deleteNodeAndReturnReplacement(deletedNode : BinaryNode, parent:BinaryNode): BinaryNode {
      // No need to do further operations, just replace it with undefined
      if (deletedNode.hasNoChilds) return undefined;

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

  findNodeWithValue(value: number, node: BinaryNode = this.root): BinaryNode {
    if (!node) return undefined;
    if (node.value === value) return node;

    return value < node.value ? this.findNodeWithValue(value, node.left) : this.findNodeWithValue(value, node.right);
  }
}
