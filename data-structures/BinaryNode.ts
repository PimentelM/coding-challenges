// Data structure written by Mateus Pimentel
export class BinaryNode {
  parent: BinaryNode;
  value: number;
  right: BinaryNode;
  left: BinaryNode;

  data: any;

  private cache: any = {};

  constructor(value: number, parent: BinaryNode = undefined, data: any = undefined) {
    this.parent = parent;
    this.value = value;
    this.data = data;
  }

  resetCache() {
    this.cache = {};
  }

  hasNoChilds(): boolean {
    return !this.left && !this.right;
  }

  hasBothChilds(): boolean {
    return !!this.left && !!this.right;
  }

  hasOneChild(): boolean {
    return this.hasAnyChild() && !this.hasBothChilds();
  }

  hasAnyChild(): boolean {
    return !!this.left || !!this.right;
  }

  hasLeftChild(): boolean {
    return !!this.left;
  }

  hasRightChild(): boolean {
    return !!this.right;
  }

  setLeftChild(node: BinaryNode) {
    this.left = node;
    if (node) node.setParent(this);
  }

  setRightChild(node: BinaryNode) {
    this.right = node;
    if (node) node.setParent(this);
  }

  addRightNode(value: number, data: any = undefined) {
    if (this.right) throw new Error('Node already exists');

    return (this.right = new BinaryNode(value, this, data));
  }

  addLeftNode(value: number, data: any = undefined) {
    if (this.left) throw new Error('Node already exists');

    return (this.left = new BinaryNode(value, this, data));
  }

  setValue(value: number) {
    this.value = value;
  }

  setData(data: any) {
    this.data = data;
  }

  setParent(node: BinaryNode) {
    this.parent = node;
  }

  calcValueFromData(f: (data: any) => number) {
    return (this.value = f(this.data));
  }

  calcLevel(startingIndex: number = 1): number {
    if (this.cache.level) return this.cache.level;
    if (!this.parent) return startingIndex;

    return (this.cache.level = this.parent.calcLevel() + 1);
  }

  inOrderTraverse(): BinaryNode[] {
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

  preOrderTraverse(): BinaryNode[] {
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

  postOrderTraverse(): BinaryNode[] {
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

  levelOrderTraverse(): BinaryNode[] {
    let result = [];

    let traverseQueue: BinaryNode[] = [];

    let current: BinaryNode = this;

    while (current) {
      result.push(current);
      if (current.left) traverseQueue.push(current.left);
      if (current.right) traverseQueue.push(current.right);

      current = traverseQueue.shift();
    }

    return result;
  }

  executeForAllNodes(action: (node: BinaryNode) => void, order: 'level' | 'in' | 'pre' | 'post' = 'level') {
    this[`${order}OrderTraverse`]().map(action);
  }

  executeForAllNodesInLevelOrder(action: (node: BinaryNode) => void) {
    this.levelOrderTraverse().map(action);
  }

  executeForAllNodesInOrder(action: (node: BinaryNode) => void) {
    this.inOrderTraverse().map(action);
  }

  executeForAllNodesPreOrder(action: (node: BinaryNode) => void) {
    this.preOrderTraverse().map(action);
  }

  executeForAllNodesPostOrder(action: (node: BinaryNode) => void) {
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
      console.log(
        this.inOrderTraverse()
          .map(x => x.value)
          .join(' ')
      );
  }
}
