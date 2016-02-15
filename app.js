var DataTypes_1 = require("./DataTypes");
var astar_1 = require("./astar");
var RouteTransformer_1 = require("./RouteTransformer");
var random = false;
var astar = new astar_1.AStar();
if (random) {
    var vertices = [];
    vertices[0] = new DataTypes_1.Vertex('v:0', new DataTypes_1.Vector2(Math.random() * 100, Math.random() * 100));
    for (var i = 1; i < 1000; i++) {
        vertices[i] = new DataTypes_1.Vertex("v:" + i.toString(), new DataTypes_1.Vector2(Math.random() * 2000, Math.random() * 2000));
        for (var j = 0; j < 2; j++) {
            var vertexTo = vertices[Math.round(Math.random() * i)];
            var found = false;
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
        astar.addVertex(vertices[vertex]);
    }
    var start = new Date();
    var route = astar.shortestPath(vertices[1], vertices[900], astar_1.HeuristicType.Manhattan).concat(vertices[1]);
    route.reverse();
    route.forEach(function (vertex) {
        console.log(vertex.identifier);
    });
    var transformer = new RouteTransformer_1.RouteTransformer(route);
    transformer.morph();
    console.log('-----');
    console.log(astar.iterations);
    console.log(new Date() - start);
}
else {
    var a = new DataTypes_1.Vertex("A", new DataTypes_1.Vector2(0, 0));
    var b = new DataTypes_1.Vertex("B", new DataTypes_1.Vector2(1, 1));
    var c = new DataTypes_1.Vertex("C", new DataTypes_1.Vector2(1, 0));
    var d = new DataTypes_1.Vertex("D", new DataTypes_1.Vector2(3, 1));
    var e = new DataTypes_1.Vertex("E", new DataTypes_1.Vector2(3, 2));
    var f = new DataTypes_1.Vertex("F", new DataTypes_1.Vector2(2, 1));
    var g = new DataTypes_1.Vertex("G", new DataTypes_1.Vector2(2, 0));
    var h = new DataTypes_1.Vertex("H", new DataTypes_1.Vector2(2, 2));
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
    astar.addVertex(a);
    astar.addVertex(b);
    astar.addVertex(c);
    astar.addVertex(d);
    astar.addVertex(e);
    astar.addVertex(f);
    astar.addVertex(g);
    astar.addVertex(h);
    var start = new Date();
    var route = astar.shortestPath(a, e, astar_1.HeuristicType.Manhattan).concat(a);
    route.reverse();
    route.forEach(function (vertex) {
        console.log(vertex.identifier);
    });
    var transformer = new RouteTransformer_1.RouteTransformer(route);
    transformer.morph();
    console.log('-----');
    console.log(astar.iterations);
    console.log(new Date() - start);
}
//# sourceMappingURL=app.js.map