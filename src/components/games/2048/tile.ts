import { Graphics } from "pixi.js";
import { CellPosition } from "./gameScene";

export default class Tile extends Graphics {
	private TILE_SIZE = 135;
	private TILE_SPACING = 12;

	public value: number;
	public tilePosition: CellPosition;

	constructor(x: number, y: number, value: number) {
		super();

		this.value = value;
		this.tilePosition = {
			x, y
		}
	}

	public draw() {
		// #ffff00
		this.beginFill(0xffff00);
		this.drawRoundedRect(
			this.TILE_SPACING + this.tilePosition.x * (this.TILE_SIZE + this.TILE_SPACING),
			this.TILE_SPACING + this.tilePosition.y * (this.TILE_SIZE + this.TILE_SPACING),
			this.TILE_SIZE,
			this.TILE_SIZE,
			30
		);
		this.endFill();
	}
}
