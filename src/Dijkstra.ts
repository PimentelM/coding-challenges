import {IGraphNode, IGraph} from "./types";
import {Heap} from "./Heap";

export interface IDijkstraInput {
    startId: string,
    destinationId: string,
    graph: IGraph
}



function dijkstra({startId, destinationId, graph}: IDijkstraInput) {
    let heap: Heap = new Heap();

    let visited: { [label: string]: IGraphNode } = {}




}
