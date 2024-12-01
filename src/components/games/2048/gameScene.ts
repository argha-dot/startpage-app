import Keyboard from "@/lib/game/keyboard";
import Scene from "@/lib/game/scene";
import { Graphics } from "pixi.js";
import { Tween, Group } from "tweedle.js";
import Tile from "./tile";

export interface CellPosition {
	x: number;
	y: number;
}

export default class GameScene extends Scene {
	private TILE_SIZE = 135;
	private TILE_SPACING = 12;

	private board: Array<Array<Tile | null>> = [
		[new Tile(0, 0, 2), null, null, null],
		[new Tile(0, 1, 2), null, null, null],
		[null, null, null, null],
		[null, null, null, null],
	];

	private base: Graphics;

	constructor() {
		super();

		this.base = new Graphics();
	}

	public async init() {
		Keyboard.init();

		this.createBoard();
		this.updateBoard();
		// for (let i = 0; i < 2; i++) {
		// 	this.createRandomTile();
		// }
	}

	public update(_dt: number) {
		this.handleKeyInput();
		Keyboard.update();

		Group.shared.update();
	}

	public stop() {
		Keyboard.stop();
	}

	private createBoard() {
		// #9c8a7b
		this.base.beginFill(0x9c8a7b)
		this.base.drawRoundedRect(0, 0, 600, 600, 30);
		this.base.endFill();

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const rect = new Graphics();
				// #BDAC97
				rect.beginFill(0xBDAC97);
				rect.drawRoundedRect(
					this.TILE_SPACING + j * (this.TILE_SIZE + this.TILE_SPACING),
					this.TILE_SPACING + i * (this.TILE_SIZE + this.TILE_SPACING),
					this.TILE_SIZE,
					this.TILE_SIZE,
					30
				);
				rect.endFill();
				this.base.addChild(rect);
			}
		}

		this.addChild(this.base);
	}

	private createRandomTile() {
		const availableCells = this.availableCells();
		if (availableCells.length > 0) {
			const value = Math.random() < 0.9 ? 2 : 4;
			var tile = availableCells[Math.floor(Math.random() * availableCells.length)];

			this.board[tile.x][tile.y] = new Tile(tile.x, tile.y, value);
		}

		this.updateBoard();
		console.log(this.board);
	}

	private handleKeyInput() {
		if (Keyboard.isKeyReleased("KeyD")) {
			console.log("KeyD");
			let tween = new Tween(this.board[0][0]).to({
				x: 3 * (this.TILE_SIZE + this.TILE_SPACING)
			}, 75).start();
			this.board[0][0] = null;

			this.board[0][3] = new Tile(3, 0, 2);

			tween.onComplete(() => {
				this.updateBoard();
			})
		}

		if (Keyboard.isKeyReleased("KeyA")) {
			console.log("KeyA");
		}

		if (Keyboard.isKeyReleased("KeyS")) {
			console.log("KeyS");
		}

		if (Keyboard.isKeyReleased("KeyW")) {
			console.log("KeyW");
		}
	}

	private updateBoard() {
		this.eachCell((_y, _x, tile) => {
			if (!(tile === null)) {
				tile.draw();

				this.base.addChild(tile);
			}
		})
	}

	private availableCells(): CellPosition[] {
		let cells: CellPosition[] = [];

		this.eachCell((x, y, tile) => {
			if (tile === null) {
				cells.push({ x, y });
			}
		});

		return cells;
	}

	private eachCell(callback: (x: number, y: number, tile: Tile | null) => void) {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[y].length; x++) {
				callback(y, x, this.board[y][x]);
			}
		}
	}
}
