import {Heap} from "./Heap";
import {BinaryNode} from "./BinaryNode";

describe(`Testing Heap`, () => {
    let heap;
    let count;
    let smallestElementAdded = Infinity;
    let biggestElementAdded = -Infinity;
    beforeEach(() => {
        heap = new Heap();
        count = 0;


        '6 4 8 3 5 7 9'
            .split(' ')
            .map(Number)
            .forEach(value => {
                heap.addNode(value);
                count++;
                if(value < smallestElementAdded){
                    smallestElementAdded = value;
                }
                if(value > biggestElementAdded){
                    biggestElementAdded = value;
                }
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

    it('Should have a peek method that doesnt change heap size', ()=>{
        let peek = heap.peek();

        expect(peek).toBe(smallestElementAdded)
        expect(heap.root.nodeCount()).toBe(count)
    })


    it('Should have a poll method that removes the element from the heap', ()=>{
        expect(heap.root.nodeCount()).toBe(count)

        let poll = heap.poll();

        expect(poll).toBe(smallestElementAdded)
        expect(heap.root.nodeCount()).toBe(count -1)
    })




});
