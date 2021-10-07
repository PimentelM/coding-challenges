'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BinaryTreeNode = void 0;
// Data structure written by Mateus Pimentel
class BinaryTreeNode {
  constructor(value, parent = undefined) {
    this.cache = {};
    this.parent = parent;
    this.value = value;
  }
  resetCache() {
    this.cache = {};
  }
  calcLevel(startingIndex = 1) {
    if (this.cache.level) return this.cache.level;
    if (!this.parent) return startingIndex;
    return (this.cache.level = this.parent.calcLevel() + 1);
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
  executeForAllNodes(order, action) {
    this[`${order}OrderTraverse`]().map(action);
  }
  executeForAllNodesInOrder(action) {
    this.inOrderTraverse().map(action);
  }
  executeForAllNodesPreOrder(action) {
    this.preOrderTraverse().map(action);
  }
  executeForAllNodesPostOrder(action) {
    this.postOrderTraverse().map(action);
  }
  print(prefix = '', isTail) {
    let nodeType = !this.parent ? `-` : this.parent.right === this ? `r` : `l`;
    console.log(prefix + `|-${nodeType} ${this.value} {${this.calcLevel()}}`);
    if (this.left) {
      this.left.print(prefix + (isTail ? '    ' : '|   '), !this.right);
    }
    if (this.right) {
      this.right.print(prefix + (isTail ? '    ' : '|   '), true);
    }
    // If it's root
    if (!this.parent)
      console.log(
        this.inOrderTraverse()
          .map(x => x.value)
          .join(typeof this.value === 'number' ? ' ' : '\n')
      );
  }
}
exports.BinaryTreeNode = BinaryTreeNode;
//# sourceMappingURL=BinaryTree.js.map
