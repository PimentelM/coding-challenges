// Data structure written by Mateus Pimentel
export class BinaryNode {
  parent: BinaryNode;
  value: number;
  right: BinaryNode;
  left: BinaryNode;

  data: any;

  private cache: { level?: number} = {};

  constructor(value: number, data: any,parent: BinaryNode = undefined) {
    this.parent = parent;
    this.value = value;
    this.data = data;
  }

  private resetCache() {
    this.cache = {};
  }

  hasParent() {
    return !!this.parent
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

    return (this.right = new BinaryNode(value, data, this));
  }

  addLeftNode(value: number, data: any = undefined) {
    if (this.left) throw new Error('Node already exists');

    return (this.left = new BinaryNode(value, data, this));
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

  isBiggerThan(node: BinaryNode){
    return this.value > node.value
  }

  isSmallerThan(node:BinaryNode){
    return this.value < node.value
  }

  // returns true when swap is executed successfully
  swapValuesWith(node: BinaryNode): boolean {
    if (!node) return false;


    let thisValue = this.value;
    let thisData = this.data;

    let nodeData = node.data;
    let nodeValue = node.value;

    this.value = nodeValue;
    this.data = nodeData;
    this.resetCache();

    node.value = thisValue;
    node.data = thisData;
    node.resetCache();


    return true;
  }

  getLevel(startingIndex: number = 1, useCache: boolean = false): number {
    if (useCache && this.cache.level) return this.cache.level;
    if (!this.parent) return startingIndex;

    return (this.cache.level = this.parent.getLevel() + 1);
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

  nodeCount() : number {
    return this.inOrderTraverse().length;
  }

  executeForAllNodes(action: (node: BinaryNode) => any){
    return this.levelOrderTraverse().map(action);
  }

  print(prefix = '', isTail = false) {
    let nodeType = !this.parent ? `-` : this.parent.right === this ? `r` : `l`;

    console.log(prefix + `|-${nodeType} ${this.value} {${this.getLevel()}}`);

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
