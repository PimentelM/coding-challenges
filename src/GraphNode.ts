import {Edge, IGraphNode} from "./types";

// Data structure written by Mateus Pimentel
export class GraphNode implements IGraphNode {
    label: string; // string | number
    data: any;
    adjacentTable : { [label: string]: Edge } = {} // { [label]: { node, weight } }
    isDirected;

    constructor(label : string, data = {}, isDirected = false) {

        this.isDirected = isDirected;
        this.label = label;
        this.data = data;
    }

    addAdjacent(node : GraphNode, weight: number = 1){
        if(this.isAdjacent(node.label)) return;

        this.adjacentTable[node.label] = {node, weight}

        if(!this.isDirected){
            node.addAdjacent(this,weight)
        }
    }

    getAdjacentEdges() : Edge[]{
        return Object.values(this.adjacentTable)
    }

    isAdjacent(label : string) : boolean {
        return !!this.adjacentTable[label]
    }

}



