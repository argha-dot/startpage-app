import { keyboard } from "@/lib/game/keyboard";
import Scene from "@/lib/game/scene";
import Player from "./player";
import GameMap from "./map";

export class GameScene extends Scene {
	private player: Player;
	private map: GameMap;

	constructor() {
		super();

		this.player = new Player();
		this.map = new GameMap();
	}

	public async init() {
		keyboard.init();

		this.map.init(this);
		this.player.init(this)
	}

	public start() { }
	public stop() { }

	public update(dt: number) {
		this.player.update(dt);
	}
}
