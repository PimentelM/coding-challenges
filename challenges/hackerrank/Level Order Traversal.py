

"""
Node is defined as
self.left (the left child of the node)
self.right (the right child of the node)
self.info (the value of the node)
"""
def levelOrder(root):

    q = [root]



    while len(q) > 0:
        node = q.pop(0)
        print(node.info,end=" ")
        if node.left != None:
            q.append(node.left)
        if node.right != None:
            q.append(node.right)



    #Write your code here

