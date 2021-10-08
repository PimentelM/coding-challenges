"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinarySearchTree_1 = require("./BinarySearchTree");
describe(`Testing Binary Search Tree`, () => {
    let tree;
    beforeEach(() => {
        tree = new BinarySearchTree_1.BinarySearchTree();
        '6 4 8 3 5 7 9'
            .split(' ')
            .map(Number)
            .forEach(value => {
            tree.addNode(value);
        });
    });
    it('Should be able to create the tree', () => {
        let result = tree.root
            .levelOrderTraverse()
            .map(x => x.value)
            .join(' ');
        expect(result).toBe('6 4 8 3 5 7 9');
    });
    it('Should be able to find a node if it exists', () => {
        tree.root.executeForAllNodes(node => {
            if (node.value === 5) {
                node.data = 'DATA - 5';
            }
        });
        let node = tree.findNodeWithValue(5);
        expect(node.value).toBe(5);
        expect(node.data).toBe('DATA - 5');
    });
    it.skip('Should be able to delete a node in such way that the tree remaisn correct', () => {
        tree.addNode(16);
        tree.addNode(13);
        tree.addNode(12);
        tree.addNode(11);
        tree.deleteNodeWithValue(8);
        let result = tree.root
            .inOrderTraverse()
            .map(x => x.value)
            .join(' ');
        expect(result).toBe('3 4 5 6 7 9 11 12 13 16');
        tree.deleteNodeWithValue(9);
        result = tree.root
            .inOrderTraverse()
            .map(x => x.value)
            .join(' ');
        expect(result).toBe('3 4 5 6 7 11 12 13 16');
        tree.deleteNodeWithValue(11);
        result = tree.root
            .inOrderTraverse()
            .map(x => x.value)
            .join(' ');
        expect(result).toBe('3 4 5 6 7 12 13 16');
        tree.deleteNodeWithValue(12);
        result = tree.root
            .inOrderTraverse()
            .map(x => x.value)
            .join(' ');
        expect(result).toBe('3 4 5 6 7 13 16');
    });
});
//# sourceMappingURL=BinarySearchTree.spec.js.map