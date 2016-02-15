import { Vertex } from "./DataTypes";
export declare class RouteTransformer {
    private route;
    constructor(route: Vertex[]);
    morph(): string[];
    private between(value, start, end);
}
