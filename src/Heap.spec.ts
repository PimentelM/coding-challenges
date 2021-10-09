import {Heap} from "./Heap";

describe(`Testing FastHeap`, () => {
    let heap : Heap;
    let count : number;
    let smallestElementAdded = Infinity;
    let biggestElementAdded = -Infinity;
    beforeEach(() => {
        heap = new Heap();
        count = 0;

        // Heap should support nodes with same value
        '6 4 8 3 5 7 7 7 9 9 9 9'
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
        // Tree should keep correctness after every test
        expect(heap.isCorrect()).toBeTruthy()
    })

    // TODO: Test binary tree operations as in BinaryNode.spec.ts

    it('All nodes should be added successfully', () => {
        expect(heap.treeSequence.length).toBe(count)
    })


    it('Parent nodes cant have a value that\'s bigger than children value', () => {

        let results = heap.levelOrderTraverse().map((i)=>heap.isNodeValueGreaterThanOrEqualToChildren(i))

        expect(results.every(x=>!x)).toBe(true);


    });

    it('Should be able to poll with data', () => {
        while(heap.count() > 0){
            let { data, value } = heap.pollWithData()

            expect(data).toBe(`data for ${value}`)
        }

    })

    it('Should be able to switch heap from min to max and vice versa', () => {

        heap.switchType();

        expect(heap.isCorrect()).toBe(true)

        heap.switchType();

    });

    it('Comparassions should return false when there is no parent/ children to compare to', () => {
        let heap = new Heap();

        // Heap should support nodes with same value
        '1 2 3 4 5 6 7 8'
            .split(' ')
            .map(Number)
            .forEach(value => {
                heap.addValue(value);
            });

        expect(heap.isNodeValueGreaterThanParent(0)).toBe(false)
        expect(heap.isNodeValueGreaterThanParent(0)).toBe(false)


        expect(heap.isNodeValueSmallerThanOrEqualToChildren(7)).toBe(false)
        expect(heap.isNodeValueGreaterThanOrEqualToChildren(7)).toBe(false)



    })

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
