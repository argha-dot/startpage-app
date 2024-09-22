import { Sprite, Texture, Container } from "pixi.js";
import { GAME_WIDTH } from "./consts";

export default class GameMap extends Container {
	public MAP = [
		[0, 0, 0, 1, 0],
		[1, 1, 1, 1, 0],
		[1, 0, 0, 0, 0],
		[1, 1, 1, 1, 0],
		[0, 0, 1, 1, 1],
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0],
	];

	constructor() {
		super();
	}

	public init(game: Container) {
		for (let i = 0; i < this.MAP.length; i++) {
			for (let j = 0; j < this.MAP[i].length; j++) {
				if (this.MAP[i][j] === 0) {
					continue;
				}
				const block = new Block();
				block.init(this, j, i);
			}
		}
		console.log(this.width, this.height);
		this.position.set(GAME_WIDTH / 2 - 5 * 64 / 2, 0)
		game.addChild(this);
	}
}

export class Block extends Sprite {
	public BLOCK_SIZE = 64;

	constructor() {
		super(Texture.WHITE);
	}

	public init(map: Container, x: number, y: number) {
		this.position.set(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE);

		this.width = this.BLOCK_SIZE;
		this.height = this.BLOCK_SIZE;

		this.tint = 0xff0000;

		map.addChild(this);
	}
}
