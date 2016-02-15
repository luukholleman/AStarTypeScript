/// <reference path="DataTypes.d.ts" />
import { Vertex } from "./DataTypes";
export declare enum HeuristicType {
    Manhattan = 0,
    Euclidian = 1,
}
export declare class AStar {
    private INFINITY;
    private vertices;
    iterations: number;
    addVertex(vertex: Vertex): void;
    shortestPath(start: Vertex, finish: Vertex, heuristic: HeuristicType): Vertex[];
}
