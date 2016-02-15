var DataTypes_1 = require("./DataTypes");
var Dijkstra = (function () {
    function Dijkstra() {
        this.INFINITY = 1337;
        this.vertices = {};
        this.iterations = 0;
    }
    Dijkstra.prototype.addVertex = function (vertex) {
        this.vertices[vertex.identifier] = vertex;
    };
    Dijkstra.prototype.shortestPath = function (start, finish) {
        var nodes = new DataTypes_1.PriorityQueue();
        var distances = {};
        var previous = {};
        var path = [];
        var closest;
        var alt;
        var edgeIdentifier;
        for (var i in this.vertices) {
            if (this.vertices[i].equals(start)) {
                distances[i] = new DataTypes_1.KeyValuePair(this.vertices[i], 0);
                nodes.enqueue(0, this.vertices[i]);
            }
            else {
                distances[i] = new DataTypes_1.KeyValuePair(this.vertices[i], this.INFINITY);
                nodes.enqueue(this.INFINITY, this.vertices[i]);
            }
            previous[i] = null;
        }
        while (!nodes.isEmpty()) {
            closest = nodes.dequeue();
            this.iterations++;
            if (closest.equals(finish)) {
                while (previous[closest.identifier]) {
                    path.push(closest);
                    closest = previous[closest.identifier];
                }
                break;
            }
            for (edgeIdentifier in closest.edges) {
                alt = distances[closest.identifier].value + closest.edges[edgeIdentifier].value;
                if (alt < distances[edgeIdentifier].value) {
                    distances[edgeIdentifier].value = alt;
                    previous[edgeIdentifier] = closest;
                    nodes.enqueue(alt, closest.edges[edgeIdentifier].key);
                }
            }
        }
        return path;
    };
    return Dijkstra;
})();
exports.Dijkstra = Dijkstra;
//# sourceMappingURL=dijkstra.js.map