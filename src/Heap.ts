// Data structure written by Mateus Pimentel
export class Heap {
    treeSequence: number[] = [];
    dataForIndex: any[] = [];
    type: "min" | "max";

    constructor(type: "min" | "max" = "min") {
        this.type = type;
    }

    // This operation is the same for max and min heap
    addValue(value: number, data: any = undefined): void {
        this.treeSequence.push(value);
        this.dataForIndex.push(data);

        // Once the node is added, we need to bubble it up
        this.bubbleUpNode(this.treeSequence.length - 1);
    }

    private siftDownNode(nodeIndex: number) {
        // Switch node positions with it's left child while it's value is:
        // Lesser than it's child when doing a MAX heap
        // Greater than it's child when doing a MIN heap

        if (!this.hasLeft(nodeIndex)) return false

        let hasSiftedDown = false;

        while (this.hasLeft(nodeIndex)) {
            let childIndex = this.getLeftIndex(nodeIndex)

            if (this.hasRight(nodeIndex)) {
                let doChooseRightChild = this.type === "min" ?
                    this.getRightValue(nodeIndex) < this.getLeftValue(nodeIndex)
                    : this.getRightValue(nodeIndex) > this.getLeftValue(nodeIndex)
                if (doChooseRightChild) {
                    childIndex = this.getRightIndex(nodeIndex)
                }
            }

            let shouldSift = this.type === "min" ?
                this.getNodeValue(childIndex) < this.getNodeValue(nodeIndex)
                : this.getNodeValue(childIndex) > this.getNodeValue(nodeIndex)

            if (shouldSift) {
                if (this.swapValues(nodeIndex, childIndex)) {
                    nodeIndex = childIndex;
                    hasSiftedDown = true;
                }
            } else {
                break;
            }
        }

        return hasSiftedDown;

    }


    private bubbleUpNode(nodeIndex: number) {
        // Switch node positions with it's parent while it's value is:
        // Lesser than it's parent when doing a MIN heap
        // Greater than it's parent when doing a MAX heap

        if (!this.hasParent(nodeIndex)) return false;

        let hasBubbled = false;
        let hasToBubble = (i : number) => {
            // If has no parent, then no need to bubble.
            if(!this.hasParent(i)) return false;

            return this.type === "min" ?
                // Has to bubble if parent value is bigger than node value
                this.getParentValue(i) > this.getNodeValue(i) :
                // Has to bubble if parent value is smaller than node value
                this.getParentValue(i) < this.getNodeValue(i)
        }



        while (hasToBubble(nodeIndex)) {
            let parentIndex = this.getParentIndex(nodeIndex)
            if (this.swapValues(nodeIndex, parentIndex)) {
                nodeIndex = parentIndex
                hasBubbled = true;
            } else {
                break;
            }
        }

        return hasBubbled;

    }

    private heapfy() {

        let tree = this.treeSequence
        let data = this.dataForIndex

        this.treeSequence = []
        this.dataForIndex = []

        let i = 0;
        tree.forEach(value => {
            this.addValue(value, data[i])
            i++;
        })


    }


    public peek(): number {

        return this.treeSequence[0]
    }

    public pollWithData(): { value: number, data: number } {

        if (this.treeSequence.length === 0) throw new Error("Can't poll from empty heap")

        let lastValue = this.treeSequence.pop()
        let lastData = this.dataForIndex.pop()

        if (this.treeSequence.length === 0)
            return {
                value: lastValue,
                data: lastData
            }


        let returnValue = this.treeSequence[0]
        let returnData = this.dataForIndex[0]

        this.treeSequence[0] = lastValue
        this.dataForIndex[0] = lastData

        // Sift down the now root node
        this.siftDownNode(0)


        return {
            value: returnValue,
            data: returnData
        }
    }

    public peekWithData(): { value: number, data: number } {
        return {
            value: this.treeSequence[0],
            data: this.dataForIndex[0]
        }
    }

    public poll(getData = false): number {

        if (this.treeSequence.length === 0) throw new Error("Can't poll from empty heap")

        let lastValue = this.treeSequence.pop()
        let lastData = this.dataForIndex.pop()

        if (this.treeSequence.length === 0)
            return lastValue


        let returnValue = this.treeSequence[0]

        this.treeSequence[0] = lastValue
        this.dataForIndex[0] = lastData

        // Sift down the now root node
        this.siftDownNode(0)


        return returnValue;
    }

    // Tree sequence operations
    hasLeft(i: number) {
        return this.getLeftValue(i) !== undefined
    }

    hasRight(i: number) {
        return this.getRightValue(i) !== undefined
    }

    hasParent(i: number) {
        return this.getParentValue(i) !== undefined
    }

    hasNoChilds(i: number): boolean {
        return !this.hasLeft(i) && !this.hasRight(i);
    }

    hasBothChilds(i: number): boolean {
        return !!this.hasLeft(i) && !!this.hasRight(i);
    }

    hasOneChild(i: number): boolean {
        return this.hasAnyChild(i) && !this.hasBothChilds(i);
    }

    hasAnyChild(i: number): boolean {
        return !!this.hasLeft(i) || !!this.hasLeft(i);
    }

    getLeftValue(i: number) {
        return this.treeSequence[this.getLeftIndex(i)]
    }

    getRightValue(i: number) {
        return this.treeSequence[this.getRightIndex(i)]
    }

    getParentValue(i: number) {
        return this.treeSequence[this.getParentIndex(i)]
    }

    getLeftIndex(i: number) {
        return i * 2 + 1
    }

    getRightIndex(i: number) {
        return i * 2 + 2
    }

    getParentIndex(i: number) {
        return Math.floor((i - 1) / 2)
    }

    getNodeValue(i: number) {
        return this.treeSequence[i]
    }

    getNodeData(i: number) {
        return this.dataForIndex[i]
    }

    setNodeValue(i: number, value: number) {
        this.treeSequence[i] = value
    }

    setNodeData(i: number, data: any) {
        this.dataForIndex[i] = data
    }

    setLeftChildValue(i: number, value: number) {
        this.setNodeValue(this.getLeftIndex(i), value)
    }

    setRightChildValue(i: number, value: number) {
        this.setNodeValue(this.getRightIndex(i), value)
    }

    swapValues(nodeAIndex: number, nodeBIndex: number) {
        let a = this.getNodeValue(nodeAIndex)
        let b = this.getNodeValue(nodeBIndex)

        let dataA = this.getNodeData(nodeAIndex)
        let dataB = this.getNodeData(nodeBIndex)

        if (a === undefined || b === undefined)
            return false

        this.setNodeValue(nodeAIndex, b)
        this.setNodeValue(nodeBIndex, a)

        this.setNodeData(nodeAIndex, dataB)
        this.setNodeData(nodeBIndex, dataA)

        return true
    }

    // Value comparassions

    isNodeValueSmallerThanOrEqualToChildren(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getLeftValue(nodeIndex)) return false
        }

        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) > this.getRightValue(nodeIndex)) return false
        }

        return this.hasAnyChild(nodeIndex);




    }

    isNodeValueGreaterThanOrEqualToChildren(nodeIndex: number): boolean {
        // Note we are not taking in consideration a false return for cases
        // when the node and parent value are the same.

        if (this.hasLeft(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getLeftValue(nodeIndex)) return false
        }

        if (this.hasRight(nodeIndex)) {
            if (this.getNodeValue(nodeIndex) < this.getRightValue(nodeIndex)) return false
        }

        return this.hasAnyChild(nodeIndex);
    }

    isNodeValueSmallerThanParent(nodeIndex: number): boolean {

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) < this.getParentValue(nodeIndex)
    }

    isNodeValueGreaterThanParent(nodeIndex: number): boolean {

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) > this.getParentValue(nodeIndex)
    }

    isNodeValueSmallerThanOrEqualToParent(nodeIndex: number): boolean {

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) <= this.getParentValue(nodeIndex)
    }

    isNodeValueGreaterThanOrEqualToParent(nodeIndex: number): boolean {

        if (!this.hasParent(nodeIndex)) {
            return false
        }

        return this.getNodeValue(nodeIndex) >= this.getParentValue(nodeIndex)
    }




    // Traverses

    inOrderTraverse(nodeIndex = 0): number[] {
        let result = [];

        if (this.hasLeft(nodeIndex)) {
            result.push(...this.inOrderTraverse(this.getLeftIndex(nodeIndex)))
        }

        result.push(nodeIndex)

        if (this.hasRight(nodeIndex)) {
            result.push(...this.inOrderTraverse(this.getRightIndex(nodeIndex)))
        }


        return result
    }

    postOrderTraverse(nodeIndex = 0): number[] {
        let result = [];

        if (this.hasLeft(nodeIndex)) {
            result.push(...this.postOrderTraverse(this.getLeftIndex(nodeIndex)))
        }

        if (this.hasRight(nodeIndex)) {
            result.push(...this.postOrderTraverse(this.getRightIndex(nodeIndex)))
        }

        result.push(nodeIndex)

        return result
    }

    levelOrderTraverse(): number[] {
        let result = [];

        let traverseQueue: number[] = [];

        let currentIndex: number = 0;

        while (currentIndex) {
            result.push(currentIndex)
            if (this.hasLeft(currentIndex)) traverseQueue.push(this.getLeftIndex(currentIndex));
            if (this.hasRight(currentIndex)) traverseQueue.push(this.getRightIndex(currentIndex));

            currentIndex = traverseQueue.shift();
        }

        return result;
    }


    // Test utils

    public count() {
        return this.treeSequence.length
    }

    public isCorrect(): boolean {

        if (this.count() === 0) return true


        // min: Node value should be smaller or equal to children's value
        // max: Node value should be bigger or equal to children's value

        // min: Node value should be bigger or equal to paren'ts value
        // max: Node value should be smaller or equal to parent's value
        let check = (i: number) => {

            if(this.type === "min"){
                if(this.hasAnyChild(i)){
                    if(!this.isNodeValueSmallerThanOrEqualToChildren(i))
                        return false
                }

                if(this.hasParent(i)){
                    if(!this.isNodeValueGreaterThanOrEqualToParent(i))
                        return false
                }
            } else {
                if(this.hasAnyChild(i)){
                    if(!this.isNodeValueGreaterThanOrEqualToChildren(i))
                        return false
                }

                if(this.hasParent(i)){
                    if(!this.isNodeValueSmallerThanOrEqualToParent(i))
                        return false
                }
            }

            return true
        }


        let i = 0;

        while(i<this.count()){
            if(!check(i))
                return false;
            i++
        }


        return true;
    }

    public switchType() {
        this.type = this.type === "min" ? "max" : "min";
        this.heapfy()
    }


}
