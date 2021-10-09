import {Heap} from "./Heap.deprecated";
import {BinaryNode} from "../src/BinaryNode";

describe.skip(`Testing Heap`, () => {
    let heap : Heap;
    let count : number;
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

    afterEach(() => {
            expect(heap.isCorrect()).toBeTruthy()
    })

    it('Root node parent should be undefined', () => {
        expect(heap.root.parent).toBe(undefined)
    })

    it('All nodes should be added successfully', () => {
        expect(heap.root.nodeCount()).toBe(count)
    })

    it('All parent nodes should be smaller than their children', () => {

        let results = heap.root.executeForAllNodes(heap.isNodeValueSmallerThanChildren)

        expect(results.every(x=>x)).toBe(true);


    });

    it('If heap is switched to max heap, all parent nodes should be greater than their children', () => {

        heap.switchType();

        let results = heap.root.executeForAllNodes(heap.isNodeValueGreaterThanChildren)

        expect(results.every(x=>x)).toBe(true);


    });

    it('Should have a peek method that doesnt change heap size', ()=>{
        let peek = heap.peek();

        expect(peek.value).toBe(smallestElementAdded)
        expect(heap.root.nodeCount()).toBe(count)
    })


    it('Should have a poll method that removes the element from the min heap correctly', ()=>{
        expect(heap.root.nodeCount()).toBe(count)

        let poll = heap.poll();

        expect(poll.value).toBe(smallestElementAdded)
        expect(heap.root.nodeCount()).toBe(count -1)

        let lastValue = smallestElementAdded
        while(heap.count() > 0){
            let currentPoll = heap.poll()

            expect(currentPoll.value >= lastValue).toBeTruthy()
            lastValue = currentPoll.value

        }


    })

    it('Should have a poll method that removes the element from the max heap correctly', ()=>{
        expect(heap.root.nodeCount()).toBe(count)

        heap.switchType()

        let poll = heap.poll();

        expect(poll.value).toBe(biggestElementAdded)
        expect(heap.root.nodeCount()).toBe(count -1)

        let lastValue = biggestElementAdded
        while(heap.count() > 0){
            let currentPoll = heap.poll()

            expect(currentPoll.value <= lastValue).toBeTruthy()
            lastValue = currentPoll.value

        }


    })




});
