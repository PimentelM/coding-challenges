
function getBinaryTreeHeight(tree){
    let getDepht = function(node) : number {
        if(!node) return 0;
        if (!node.right && !node.left) return 0;


        return 1 + Math.max(getDepht(node.left), getDepht(node.right))
    }

    return getDepht(tree.root)
}
