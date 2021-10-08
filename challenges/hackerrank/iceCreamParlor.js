'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'whatFlavors' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost
 *  2. INTEGER money
 */

function whatFlavors(flavoursCosts, money) {
    let flavourCostTable = {}

    for(let i = 0; i < flavoursCosts.length; i++){
        let id = i + 1
        let cost = flavoursCosts[i]
        if(!flavourCostTable[cost]){
            flavourCostTable[cost] = []
        }
        flavourCostTable[cost].push(id)
    }

    function printFlavours(a,b){
        console.log(`${a} ${b}`)
    }

    function getFlavourWithId(id){
        return flavoursCosts[id-1]
    }


    function findFlavourPair(){
        for(let i = 0; i < flavoursCosts.length; i++){
            let id = i + 1
            let cost = flavoursCosts[i]
            let needs = money - cost;

            let flavoursWithCostEqualToNeeds = flavourCostTable[needs]

            if(!flavoursWithCostEqualToNeeds) continue;

            // equal
            if(cost == needs){
                if(flavoursWithCostEqualToNeeds.length >= 2)
                    return printFlavours(...flavoursWithCostEqualToNeeds.slice(0,2))
            } else {
                return printFlavours(id,flavoursWithCostEqualToNeeds[0])
            }


        }

    }

    findFlavourPair()


}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine().trim(), 10);

        const n = parseInt(readLine().trim(), 10);

        const cost = readLine().replace(/\s+$/g, '').split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
