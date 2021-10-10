import {IGraphNode, IGraph} from "./types";
import {Heap} from "./Heap";

export interface IDijkstraInput {
    startId: string,
    destinationId: string,
    graph: IGraph
}

export class Dijkstra {

    findPath(from: string, to: string, graph: IGraph){
        let heap: Heap = new Heap();

        let visited: { [label: string]: IGraphNode } = {}

        let startingNode = graph.getNode(from)
        let destinationNode = graph.getNode(to)

        function addNodeToQueue(cost: number, node: IGraphNode){
            heap.addValue(cost,node)
        }




    }


}

