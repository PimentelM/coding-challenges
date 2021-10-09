import {FastHeap} from "./FastHeap";

describe(`Testing FastHeap`, () => {
    let heap : FastHeap;
    let count : number;
    let smallestElementAdded = Infinity;
    let biggestElementAdded = -Infinity;
    beforeEach(() => {
        heap = new FastHeap();
        count = 0;


        '6 4 8 3 5 7 9'
            .split(' ')
            .map(Number)
            .forEach(value => {
                let data = `data for ${value}`
                heap.addValue(value, data);
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

    // TODO: Test binary tree operations as in BinaryNode.spec.ts

    it('All nodes should be added successfully', () => {
        expect(heap.treeSequence.length).toBe(count)
    })

    it('All parent nodes should be smaller than their children', () => {

        let results = heap.levelOrderTraverse().map((i)=>heap.isNodeValueSmallerThanChildren(i))

        expect(results.every(x=>x)).toBe(true);


    });

    it('Should be able to poll with data', () => {
        while(heap.count() > 0){
            let { data, value } = heap.pollWithData()

            expect(data).toBe(`data for ${value}`)
        }

    })

    it('If heap is switched to max heap, all parent nodes should be greater than their children', () => {

        heap.switchType();

        let results = heap.levelOrderTraverse().map((i)=>heap.isNodeValueGreaterThanChildren(i))

        expect(results.every(x=>x)).toBe(true);


    });

    it('Should have a peek method that doesnt change heap size', ()=>{
        let peek = heap.peek();

        expect(peek).toBe(smallestElementAdded)
        expect(heap.count()).toBe(count)
    })


    it('Should have a poll method that removes the element from the min heap correctly', ()=>{
        expect(heap.count()).toBe(count)

        let poll = heap.poll();

        expect(poll).toBe(smallestElementAdded)
        expect(heap.count()).toBe(count -1)

        let lastValue = smallestElementAdded
        while(heap.count() > 0){
            let currentPoll = heap.poll()

            expect(currentPoll >= lastValue).toBeTruthy()
            lastValue = currentPoll

        }


    })

    it('Should have a poll method that removes the element from the max heap correctly', ()=>{
        expect(heap.count()).toBe(count)

        heap.switchType()


        let poll = heap.poll();

        expect(poll).toBe(biggestElementAdded)
        expect(heap.count()).toBe(count -1)

        let lastValue = biggestElementAdded
        while(heap.count() > 0){
            let currentPoll = heap.poll()

            expect(currentPoll <= lastValue).toBeTruthy()
            lastValue = currentPoll

        }



    })




});
