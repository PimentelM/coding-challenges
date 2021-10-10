
export interface IGraphNode {
    label: string,
    data: any,
    getAdjacentEdges() : Edge[]
}

export interface Edge {
    node: IGraphNode;
    weight: number;
}

export interface IGraph {
    nodeTable : {[label: string] : IGraphNode}
    getNode(label: string) : IGraphNode
}
