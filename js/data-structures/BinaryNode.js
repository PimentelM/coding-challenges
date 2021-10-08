"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryNode = void 0;
// Data structure written by Mateus Pimentel
class BinaryNode {
    constructor(value, parent = undefined, data = undefined) {
        this.cache = {};
        this.parent = parent;
        this.value = value;
        this.data = data;
    }
    resetCache() {
        this.cache = {};
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
        return (this.right = new BinaryNode(value, this, data));
    }
    addLeftNode(value, data = undefined) {
        if (this.left)
            throw new Error('Node already exists');
        return (this.left = new BinaryNode(value, this, data));
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
    calcValueFromData(f) {
        return (this.value = f(this.data));
    }
    calcLevel(startingIndex = 1) {
        if (this.cache.level)
            return this.cache.level;
        if (!this.parent)
            return startingIndex;
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
    executeForAllNodes(action, order = 'level') {
        this[`${order}OrderTraverse`]().map(action);
    }
    executeForAllNodesInLevelOrder(action) {
        this.levelOrderTraverse().map(action);
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
    print(prefix = '', isTail = false) {
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
            console.log(this.inOrderTraverse()
                .map(x => x.value)
                .join(' '));
    }
}
exports.BinaryNode = BinaryNode;
//# sourceMappingURL=BinaryNode.js.map