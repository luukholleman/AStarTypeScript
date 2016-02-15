/// <reference path="DataTypes.d.ts" />
import { Vertex } from "./DataTypes";
export declare class Dijkstra {
    private INFINITY;
    private vertices;
    iterations: number;
    addVertex(vertex: Vertex): void;
    shortestPath(start: Vertex, finish: Vertex): Vertex[];
}
