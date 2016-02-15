///<reference path="DataTypes.ts" />
///<reference path="dijkstra.ts" />
///<reference path="astar.ts" />

import {Vertex, Vector2} from "./DataTypes";
import {Dijkstra} from "./dijkstra";
import {AStar, HeuristicType} from "./astar";
import {RouteTransformer} from "./RouteTransformer";

var random:boolean = false;

//var dijkstra = new Dijkstra();
var astar = new AStar();

if (random) {
	var vertices:Vertex[] = [];

	vertices[0] = new Vertex('v:0', new Vector2(Math.random() * 100, Math.random() * 100));

	for (var i = 1; i < 1000; i++) {
		vertices[i] = new Vertex("v:" + i.toString(), new Vector2(Math.random() * 2000, Math.random() * 2000))

		for (var j = 0; j < 2; j++) {
			var vertexTo:Vertex = vertices[Math.round(Math.random() * i)];

			var found:boolean = false;

			for (var edge in vertices[i].edges) {
				if (vertices[i].edges[edge].key.equals(vertexTo)) {
					found = true;
					break;
				}
			}

			if (!found) {
				vertices[i].addNeighbor(vertexTo, vertices[i].position.distance(vertexTo.position));
				vertexTo.addNeighbor(vertices[i], vertices[i].position.distance(vertexTo.position));
			}
		}
	}

	for (var vertex in vertices) {
		//dijkstra.addVertex(vertices[vertex]);
		astar.addVertex(vertices[vertex]);
	}


	var start:Date = new Date();

	var route:Vertex[] = astar.shortestPath(vertices[1], vertices[900], HeuristicType.Manhattan).concat(vertices[1]);
	route.reverse();

	route.forEach((vertex:Vertex) => {
		console.log(vertex.identifier);
	});

	var transformer:RouteTransformer = new RouteTransformer(route);

	transformer.morph();

	console.log('-----');
	console.log(astar.iterations);
	console.log(new Date() - start);
} else {
	/**
	 * Create graph
	 */
	var a = new Vertex("A", new Vector2(0, 0));
	var b = new Vertex("B", new Vector2(1, 1));
	var c = new Vertex("C", new Vector2(1, 0));
	var d = new Vertex("D", new Vector2(3, 1));
	var e = new Vertex("E", new Vector2(3, 2));
	var f = new Vertex("F", new Vector2(2, 1));
	var g = new Vertex("G", new Vector2(2, 0));
	var h = new Vertex("H", new Vector2(2, 2));

	a.addNeighbor(b, 7);
	a.addNeighbor(c, 8);

	b.addNeighbor(a, 7);
	b.addNeighbor(f, 2);

	c.addNeighbor(a, 8);
	c.addNeighbor(f, 6);
	c.addNeighbor(g, 4);

	d.addNeighbor(f, 8);

	e.addNeighbor(h, 1);

	f.addNeighbor(b, 2);
	f.addNeighbor(c, 6);
	f.addNeighbor(d, 8);
	f.addNeighbor(g, 9);
	f.addNeighbor(h, 3);

	g.addNeighbor(c, 4);
	g.addNeighbor(f, 9);

	h.addNeighbor(e, 1);
	h.addNeighbor(f, 3);
//dijkstra.addVertex(a);
//dijkstra.addVertex(b);
//dijkstra.addVertex(c);
//dijkstra.addVertex(d);
//dijkstra.addVertex(e);
//dijkstra.addVertex(f);
//dijkstra.addVertex(g);
//dijkstra.addVertex(h);

	astar.addVertex(a);
	astar.addVertex(b);
	astar.addVertex(c);
	astar.addVertex(d);
	astar.addVertex(e);
	astar.addVertex(f);
	astar.addVertex(g);
	astar.addVertex(h);

	var start:Date = new Date();

	var route:Vertex[] = astar.shortestPath(a, e, HeuristicType.Manhattan).concat(a);
	route.reverse();

	route.forEach((vertex:Vertex) => {
		console.log(vertex.identifier);
	});

	var transformer:RouteTransformer = new RouteTransformer(route);

	transformer.morph();

	console.log('-----');
	console.log(astar.iterations);
	console.log(new Date() - start);
}


//
//console.log('\nAstar Euclidian:');
//start = new Date();
//astar.shortestPath(a, e, HeuristicType.Euclidian).concat(a).reverse().forEach((vertex:Vertex) => {
//	console.log(vertex.identifier);
//});
//console.log('-----');
//console.log(astar.iterations);
//console.log(new Date() - start);
