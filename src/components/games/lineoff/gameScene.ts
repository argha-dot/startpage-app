import { Keyboard } from "@/lib/game/keyboard";
import Scene from "@/lib/game/scene";
import Player from "./player";

export class GameScene extends Scene {
	private player: Player;

	constructor() {
		super();

		this.player = new Player();
	}

	public async init() {
		Keyboard.init();

		this.player.init(this)
	}

	public start() { }
	public stop() {
		Keyboard.stop();
	}

	public update(dt: number) {
		this.player.update(dt);
		Keyboard.update();
	}
}
