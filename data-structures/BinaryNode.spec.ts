import { BinaryNode } from './BinaryNode';

describe('Testing Binary Tree', () => {
  let tree: BinaryNode;

  beforeEach(() => {
    tree = new BinaryNode(6);

    let l = tree.addLeftNode(4);
    l.addLeftNode(3);
    l.addRightNode(5);

    let r = tree.addRightNode(8);
    r.addLeftNode(7);
    r.addRightNode(9);
  });

  it('Should do DFS: In Order Traverse', () => {
    let result = tree
      .inOrderTraverse()
      .map(x => x.value)
      .join(' ');

    expect(result).toBe('3 4 5 6 7 8 9');
  });

  it('Should do DFS: Pre Order Traverse', () => {
    let result = tree
      .preOrderTraverse()
      .map(x => x.value)
      .join(' ');

    expect(result).toBe('6 4 3 5 8 7 9');
  });

  it('Should do DFS: Post Order Traverse', () => {
    let result = tree
      .postOrderTraverse()
      .map(x => x.value)
      .join(' ');

    expect(result).toBe('3 5 4 7 9 8 6');
  });

  it('Should do BFS: Level Order Traverse', () => {
    let result = tree
      .levelOrderTraverse()
      .map(x => x.value)
      .join(' ');

    expect(result).toBe('6 4 8 3 5 7 9');
  });

  it('Should be able to execute an action in all nodes', () => {
    let action = function doubleValue(node: BinaryNode) {
      node.value *= 2;
    };

    tree.executeForAllNodes(action);

    let result = tree
      .levelOrderTraverse()
      .map(x => x.value)
      .join(' ');

    expect(result).toBe('12 8 16 6 10 14 18');
  });

  it('Should be able to calculate depth level', () => {
    let result;

    result = tree
      .levelOrderTraverse()
      .map(x => x.calcLevel())
      .join(' ');

    expect(result).toBe('1 2 2 3 3 3 3');

    tree.right.right.addLeftNode(20);

    result = tree
      .levelOrderTraverse()
      .map(x => x.calcLevel())
      .join(' ');

    expect(result).toBe('1 2 2 3 3 3 3 4');
  });
});
