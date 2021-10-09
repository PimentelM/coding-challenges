import {GraphNode} from "./GraphNode";
import {IGraph} from "./types";



export class Graph implements IGraph {

    nodeTable : {[label: string] : GraphNode}
    isDirected: boolean

    constructor(isDirected : boolean){
        this.isDirected = isDirected;
    }

    initializeNodes(nodeList : {label : string, data: any}[]){
        for (let {label, data} of nodeList){
            this.initializeNode(label,data)
        }
    }

    initializeNode(label : string, data: any = {}){
        if(this.nodeTable[label]) throw new Error(`Graph already contains node with label "${label}".`)
        this.nodeTable[label] = new GraphNode(label,data,this.isDirected)
    }

    addEdges(edges : {label1 : string, label2 : string, weight: number}[]){

        for (let {label1, label2, weight} of edges){
            let node1 = this.nodeTable[label1]
            let node2 = this.nodeTable[label2]

            if(!node1 || !node2) throw new Error(`Node ${!node1 ? label1 : label2} not registered`)

            node1.addAdjacent(node2, weight)
        }
    }



}
