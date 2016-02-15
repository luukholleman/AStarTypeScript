var RouteTransformer = (function () {
    function RouteTransformer(route) {
        this.route = route;
    }
    RouteTransformer.prototype.morph = function () {
        var description = [];
        var last;
        var current;
        var next;
        for (var i in this.route) {
            i = parseInt(i);
            if (i == this.route.length - 1) {
                continue;
            }
            current = this.route[i];
            if (i > 0) {
                last = this.route[i - 1];
            }
            else {
                last = current;
            }
            next = this.route[i + 1];
            console.log(last.position.toString() + " to " + current.position.toString());
            var angle = current.position.angle(next.position) - last.position.angle(current.position);
            if (this.between(angle, -113, -68)) {
                console.log("Links");
            }
            else if (this.between(angle, -68, -18)) {
                console.log("flauw links");
            }
            else if (this.between(angle, -23, 22)) {
                console.log("rechtdoor");
            }
            else if (this.between(angle, 23, 68)) {
                console.log("flauw rechts");
            }
            else if (this.between(angle, 68, 113)) {
                console.log("Rechts");
            }
        }
        return description;
    };
    RouteTransformer.prototype.between = function (value, start, end) {
        return value >= start && value <= end;
    };
    return RouteTransformer;
})();
exports.RouteTransformer = RouteTransformer;
//# sourceMappingURL=RouteTransformer.js.map