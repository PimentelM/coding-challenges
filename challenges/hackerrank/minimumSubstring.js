// Time complexity high
var minWindow = function (s, t) {

    // Length of String
    let sLength = s.length;


    // Index of window start and end

    let startOfWIndowIndex = 0;
    let endOfWindowIndex = 0;

    // Map that register the required amount of each character in a map
    let requires = {}

    for (let char of t) {
        if (requires[char] === undefined) requires[char] = 0

        requires[char] += 1
    }


    // Keeps track of the ammount of characters that are inside the window string
    let have = {}

    // Function to check if current window is valid.
    let isWindowValid = () => {
        for (let [char, value] of Object.entries(requires)) {
            if (!have[char] || have[char] < value) return false;
        }

        return true;
    }

    // Variables to keep track of the best vaid window size.
    let bestWindowSize = Infinity
    let bestWindowIndexes = {l: startOfWIndowIndex, r: endOfWindowIndex};

    let updateBestWindowValues = () => {
        if (bestWindowSize > (endOfWindowIndex - startOfWIndowIndex)) {
            bestWindowIndexes = {
                l: startOfWIndowIndex,
                r: endOfWindowIndex
            }
            bestWindowSize = endOfWindowIndex - startOfWIndowIndex
        }
    }

    // Helper functions to move window while updating have values and returning if it's valid or not.
    let stepEndOfWindow = () => {
        // Can't proceed if end of window index is actually the end of the string
        if (endOfWindowIndex === sLength) return false

        // Pick before updating end of window.
        let newLetter = s[endOfWindowIndex];

        endOfWindowIndex++;

        // If the letter is a required letter, adds it to have.
        if (requires[newLetter] !== undefined) {
            if (have[newLetter] === undefined) {
                have[newLetter] = 0;
            }
                have[newLetter] += 1
        }
        return true
    }


    let stepStartOfWindow = () => {
        // Can't proceed if start of window index is actually the end of the string
        if (startOfWIndowIndex === sLength) return false

        // Remove before updating end of window.
        let removedLetter = s[startOfWIndowIndex];

        startOfWIndowIndex++;

        // If the letter is a required letter, removes 1 count of it from have.
        if (requires[removedLetter] !== undefined) {
            have[removedLetter] -= 1
        }

        return true;
    }

    while (endOfWindowIndex <= sLength && startOfWIndowIndex < sLength) {

        // Move window end to right until it is valid
        if(!isWindowValid()){
            if(!stepEndOfWindow()) break;
        } else {
            // Update best window values
            updateBestWindowValues()
            // Move start of window to right
            if(!stepStartOfWindow()) break;
        }

    }

    if(bestWindowSize === Infinity) return ""
    else return s.substring(bestWindowIndexes.l,bestWindowIndexes.r);

};


if (process.env.LOCAL_PIMENTEL) {
    let s = "ADOBECODEBANC"
    let t = "ABC"
    console.log(
        minWindow(s, t)
    ) // BANC
}
