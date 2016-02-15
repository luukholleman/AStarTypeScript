var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValuePair;
})();
exports.KeyValuePair = KeyValuePair;
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.nodes = [];
    }
    PriorityQueue.prototype.enqueue = function (priority, value) {
        this.nodes.push(new KeyValuePair(priority, value));
        this.sort();
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.nodes.shift().value;
    };
    PriorityQueue.prototype.sort = function () {
        this.nodes.sort(function (a, b) {
            return a.key - b.key;
        });
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.nodes.length == 0;
    };
    return PriorityQueue;
})();
exports.PriorityQueue = PriorityQueue;
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.distance = function (v) {
        return Math.sqrt(((this.x - v.x) * (this.x - v.x)) + ((this.y - v.y) * (this.y - v.y)));
    };
    Vector2.prototype.angle = function (v) {
        var angle;
        angle = Math.atan2(v.y - this.y, v.x - this.x) * 57.2958;
        return angle * -1;
    };
    Vector2.prototype.toString = function () {
        return "x:" + this.x + ",y:" + this.y;
    };
    return Vector2;
})();
exports.Vector2 = Vector2;
var Vertex = (function () {
    function Vertex(identifier, position) {
        this.edges = {};
        this.identifier = identifier;
        this._position = position;
    }
    Object.defineProperty(Vertex.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Vertex.prototype.addNeighbor = function (neighbor, distance) {
        this.edges[neighbor.identifier] = new KeyValuePair(neighbor, distance);
    };
    Vertex.prototype.equals = function (other) {
        return this.identifier == other.identifier;
    };
    return Vertex;
})();
exports.Vertex = Vertex;
//# sourceMappingURL=DataTypes.js.map