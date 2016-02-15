///<reference path="DataTypes.ts" />

import {Vertex, PriorityQueue, KeyValuePair} from "./DataTypes";
import {Vector2} from "./DataTypes";

export enum HeuristicType {
	Manhattan,
	Euclidian
}

export class AStar {
	private INFINITY:number = 9001;

	private vertices:{ [vertexIdentifier: string]: Vertex } = {};

	public iterations:number = 0;

	public addVertex(vertex:Vertex):void {
		this.vertices[vertex.identifier] = vertex;
	}

	public shortestPath(start:Vertex, finish:Vertex, heuristic:HeuristicType):Vertex[] {
		var nodes:PriorityQueue<Vertex> = new PriorityQueue<Vertex>();
		var distances:{ [vertexIdentifier: string]: KeyValuePair<Vertex, number> } = {};
		var previous:{ [vertexIdentifier: string]: Vertex } = {};
		var path:Vertex[] = [];
		var closest:Vertex;
		var cost:number;
		var dist:number;
		var n:number;
		var edgeIdentifier:string;

		/**
		 * Loop all vertices
		 * Set all distances for each vertex to INFINITY
		 * Except source, set that to 0
		 **/
		for (var i in this.vertices) {
			// is vertex start?
			if (this.vertices[i].equals(start)) {
				// set start distance to 0
				distances[i] = new KeyValuePair<Vertex, number>(this.vertices[i], 0);
				nodes.enqueue(0, this.vertices[i]);
			} else {
				// set other distances to infinity
				distances[i] = new KeyValuePair<Vertex, number>(this.vertices[i], this.INFINITY);
				nodes.enqueue(this.INFINITY, this.vertices[i]);
			}

			previous[i] = null;
		}

		while (!nodes.isEmpty()) {
			closest = nodes.dequeue();

			this.iterations++;

			// if closest is finish we found the path
			if (closest.equals(finish)) {
				// loop back previous vertices to construct the path
				while (previous[closest.identifier]) {
					path.push(closest);
					closest = previous[closest.identifier];
				}

				break;
			}

			//if (!closest || distances[closest.identifier].value === this.INFINITY) {
			//	continue;
			//}

			/**
			 * Loop edges of this vertex
			 * See if the distance to this node is shorter than a previous checked route
			 * Always true if vertex is unvisited because of infinity
 			 */
			for (edgeIdentifier in closest.edges) {
				// total cost
				cost = distances[closest.identifier].value + closest.edges[edgeIdentifier].value;

				if(heuristic == HeuristicType.Euclidian) {
					// distance between 2 vector points
					dist = closest.edges[edgeIdentifier].key.position.distance(finish.position);
				} else if(heuristic == HeuristicType.Manhattan) {
					var pos1:Vector2 = closest.edges[edgeIdentifier].key.position;
					var pos2:Vector2 = finish.position;
					dist = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
				}

				n = cost + dist;

				// shorter than existing distance?
				if (n < distances[edgeIdentifier].value) {
					// set the shorter distance and replace vertex in previous
					distances[edgeIdentifier].value = n;
					previous[edgeIdentifier] = closest;

					// queue node for next iteration
					nodes.enqueue(n, closest.edges[edgeIdentifier].key);
				}
			}
		}

		return path;
	}
}
