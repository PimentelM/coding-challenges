import {Heap} from "./Heap";
import {BinaryNode} from "./BinaryNode";

describe(`Testing Heap`, () => {
    let heap;
    let count;
    beforeEach(() => {
        heap = new Heap();
        count = 0;

        '6 4 8 3 5 7 9'
            .split(' ')
            .map(Number)
            .forEach(value => {
                heap.addNode(value);
                count++;
            });
    });

    it('Root node parent should be undefined', () => {
        expect(heap.root.parent).toBe(undefined)
    })

    it('All nodes should be added successfully', () => {
        expect(heap.root.nodeCount()).toBe(count)
    })

    it('All parent nodes should be smaller than their children', () => {

        let results = heap.root.executeForAllNodes(heap.isParentValueSmallerThanChildren)

        expect(results.every(x=>x)).toBe(true);


    });

    it('If heap is switched to max heap, all parent nodes should be greater than their children', () => {

        heap.switchType();

        let results = heap.root.executeForAllNodes(heap.isParentValueGreaterThanChildren)

        expect(results.every(x=>x)).toBe(true);


    });


});
