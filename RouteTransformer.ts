import {Vertex, KeyValuePair, Vector2} from "./DataTypes";

export class RouteTransformer {
	private route:Vertex[];
	constructor(route:Vertex[]) {
		this.route = route;
	}

	public morph() : string[] {
		var description:string[] = [];

		var last:Vertex;
		var current:Vertex;
		var next:Vertex;

		for (var i in this.route) {
			i = parseInt(i);

			// skip first or last
			if(i == this.route.length - 1){
				continue;
			}

			current = this.route[i];

			if(i > 0){
				last = this.route[i - 1];
			} else {
				last = current;
			}
			next = this.route[i + 1];

			console.log(last.position.toString() + " to " + current.position.toString());
			//console.log(last.position.angle(current.position));
			//console.log(current.position.angle(next.position));
			var angle:number = current.position.angle(next.position) - last.position.angle(current.position);

			if(this.between(angle, -113, -68)) {
				console.log("Links");
			} else if(this.between(angle, -68, -18)) {
				console.log("flauw links");
			} else if(this.between(angle, -23, 22)) {
				console.log("rechtdoor");
			} else if(this.between(angle, 23, 68)) {
				console.log("flauw rechts");
			} else if(this.between(angle, 68, 113)) {
				console.log("Rechts");
			}
		}

		return description;
	}

	private between(value:number, start:number, end:number) : boolean {
		return value >= start && value <= end;
	}
}
