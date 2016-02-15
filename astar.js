var DataTypes_1 = require("./DataTypes");
(function (HeuristicType) {
    HeuristicType[HeuristicType["Manhattan"] = 0] = "Manhattan";
    HeuristicType[HeuristicType["Euclidian"] = 1] = "Euclidian";
})(exports.HeuristicType || (exports.HeuristicType = {}));
var HeuristicType = exports.HeuristicType;
var AStar = (function () {
    function AStar() {
        this.INFINITY = 9001;
        this.vertices = {};
        this.iterations = 0;
    }
    AStar.prototype.addVertex = function (vertex) {
        this.vertices[vertex.identifier] = vertex;
    };
    AStar.prototype.shortestPath = function (start, finish, heuristic) {
        var nodes = new DataTypes_1.PriorityQueue();
        var distances = {};
        var previous = {};
        var path = [];
        var closest;
        var cost;
        var dist;
        var n;
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
                cost = distances[closest.identifier].value + closest.edges[edgeIdentifier].value;
                if (heuristic == HeuristicType.Euclidian) {
                    dist = closest.edges[edgeIdentifier].key.position.distance(finish.position);
                }
                else if (heuristic == HeuristicType.Manhattan) {
                    var pos1 = closest.edges[edgeIdentifier].key.position;
                    var pos2 = finish.position;
                    dist = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
                }
                n = cost + dist;
                if (n < distances[edgeIdentifier].value) {
                    distances[edgeIdentifier].value = n;
                    previous[edgeIdentifier] = closest;
                    nodes.enqueue(n, closest.edges[edgeIdentifier].key);
                }
            }
        }
        return path;
    };
    return AStar;
})();
exports.AStar = AStar;
//# sourceMappingURL=astar.js.map