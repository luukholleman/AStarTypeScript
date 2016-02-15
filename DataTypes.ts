export class KeyValuePair<T, U> {
	public key:T;
	public value:U;

	constructor(key:T, value:U) {
		this.key = key;
		this.value = value;
	}
}

export class PriorityQueue<T> {
	private nodes:KeyValuePair<number, T>[] = [];

	public enqueue(priority:number, value:T):void {
		this.nodes.push(new KeyValuePair<number, T>(priority, value));
		this.sort();
	}

	public dequeue():T {
		return this.nodes.shift().value;
	}

	public sort():void {
		this.nodes.sort((a:KeyValuePair<number, T>, b:KeyValuePair<number, T>) => {
			return a.key - b.key;
		});
	}

	public isEmpty():boolean {
		return this.nodes.length == 0;
	}
}

export class Vector2 {
	public x:number;
	public y:number;

	constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	public distance(v:Vector2):number {
		return Math.sqrt(((this.x - v.x) * (this.x - v.x)) + ((this.y - v.y) * (this.y - v.y)))
	}

	public angle(v:Vector2):number {
		var angle:number;
		angle = Math.atan2(v.y - this.y, v.x - this.x) * 57.2958;

		return angle * -1;
	}

	public toString():string {
		return "x:" + this.x + ",y:" + this.y;
	}
}

export class Vertex {
	public identifier:string;
	public edges:{[vertex:string]: KeyValuePair<Vertex, number>} = {};
	private _position:Vector2;

	get position():Vector2 {
		return this._position;
	}

	constructor(identifier:string, position:Vector2) {
		this.identifier = identifier;
		this._position = position;
	}

	public addNeighbor(neighbor:Vertex, distance:number) {
		this.edges[neighbor.identifier] = new KeyValuePair<Vertex, number>(neighbor, distance);
	}

	public equals(other:Vertex):boolean {
		return this.identifier == other.identifier;
	}
}
