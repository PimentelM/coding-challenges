

// Complete the mergeLists function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(h1, h2) {

    let result = []

    let a = []

    while(h1){
        a.push(h1.data)
        h1 = h1.next
    }


    let b = []

    while(h2){
        b.push(h2.data)
        h2 = h2.next
    }

    while(true){

        if(a.length == 0){
            while(b.length > 0){
                result.push(b.shift())
            }
            break;
        }

        if(b.length == 0){
            while(a.length > 0){
                result.push(a.shift())
            }
            break;
        }

        if(a[0] < b[0]){
            result.push(a.shift())
        } else {
            result.push(b.shift())
        }

    }






    let lResult = new SinglyLinkedList()
    result.forEach(e=>{
        lResult.insertNode(e)
    })

    return lResult.head

}

