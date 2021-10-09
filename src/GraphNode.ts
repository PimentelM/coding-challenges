// Data structure written by Mateus Pimentel
export class GraphNode {
    id: Id; // string | number
    data: any;
    adjacentTable : { [id: Id]: Edge } = {} // { [id]: { node, weight } }
    isDirected = false;

    constructor(value : Id, data = {}) {

        this.id = value;
        this.data = data;
    }

    addAdjacent(node : GraphNode, weight: number = 1){
        if(this.isAdjacent(node.id)) return;

        this.adjacentTable[node.id] = {node, weight}

        if(!this.isDirected){
            node.addAdjacent(this,weight)
        }
    }

    getAdjacentEdges() : Edge[]{
        return Object.values(this.adjacentTable)
    }

    isAdjacent(id : Id) : boolean {
        return !!this.adjacentTable[id]
    }

}









interface Edge {
    node: GraphNode;
    weight: number;
}

type Id = string | number
