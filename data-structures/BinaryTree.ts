
// Data structure written by Mateus Pimentel
export class BinaryTreeNode {
    parent: BinaryTreeNode;
    value: any;
    right: BinaryTreeNode;
    left: BinaryTreeNode;

    private cache : any = {};

    constructor(value,parent = undefined){
        this.parent = parent;
        this.value = value;
    }


    resetCache(){
        this.cache = {}
    }

    calcLevel(startingIndex : number = 1) : number {
        if(this.cache.level) return this.cache.level;
        if(!this.parent) return startingIndex;

        return this.cache.level = this.parent.calcLevel() + 1
    }

    inOrderTraverse() : BinaryTreeNode[]{
        let result = [];

        // Traverse left node
        if (this.left){
            result.push(...this.left.inOrderTraverse())
        }

        // Adds current value
        result.push(this)

        // Traverse Right Node
        if (this.right){
            result.push(...this.right.inOrderTraverse())
        }

        return result
    }

    preOrderTraverse() : BinaryTreeNode[]{
        let result = [];

        // Adds current value
        result.push(this)

        // Traverse left node
        if (this.left){
            result.push(...this.left.preOrderTraverse())
        }

        // Traverse Right Node
        if (this.right){
            result.push(...this.right.preOrderTraverse())
        }

        return result
    }

    postOrderTraverse() : BinaryTreeNode[]{
        let result = [];

        // Traverse left node
        if (this.left){
            result.push(...this.left.postOrderTraverse())
        }

        // Traverse Right Node
        if (this.right){
            result.push(...this.right.postOrderTraverse())
        }

        // Adds current value
        result.push(this)

        return result
    }

    executeForAllNodes(order : "pre" | "post" | "in", action : (node: BinaryTreeNode) => void){
        this[`${order}OrderTraverse`]().map(action)
    }

    executeForAllNodesInOrder(action : (node: BinaryTreeNode) => void){
        this.inOrderTraverse().map(action)
    }

    executeForAllNodesPreOrder(action : (node: BinaryTreeNode) => void){
        this.preOrderTraverse().map(action)
    }

    executeForAllNodesPostOrder(action : (node: BinaryTreeNode) => void){
        this.postOrderTraverse().map(action)
    }


    print(prefix = "", isTail)
    {
        let nodeType =
            !this.parent ? `-` :
                (this.parent.right === this ? `r` : `l`)

        console.log(prefix + `|-${nodeType} ${this.value} {${this.calcLevel()}}` )


        if(this.left)
        {
            this.left.print(prefix + (isTail ? "    " : "|   "), !this.right )
        }

        if(this.right)
        {
            this.right.print(prefix + (isTail ?"    " : "|   "), true);
        }

        // If it's root
        if(!this.parent)
            console.log(
                this.inOrderTraverse()
                    .map(x=>x.value)
                    .join(typeof this.value === "number" ? " " : "\n"))

    }

}
