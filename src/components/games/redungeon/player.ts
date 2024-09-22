import { Texture, Container, Sprite, Rectangle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./consts";
import { Keyboard } from "@/lib/game/keyboard";

export default class Player extends Sprite {
	public collisionBox = new Rectangle();

	public PLAYER_WIDTH = 64;
	public PLAYER_HEIGHT = 64;

	private INPUT_BUFFER = 130;
	private INPUT_BUFFERING = 0;

	constructor() {
		super(Texture.WHITE);
	}

	public init(game: Container) {
		this.position.set(GAME_WIDTH / 2 - 32, GAME_HEIGHT - this.PLAYER_HEIGHT);

		this.height = this.PLAYER_HEIGHT;
		this.width = this.PLAYER_WIDTH;

		this.collisionBox.width = this.PLAYER_WIDTH;
		this.collisionBox.height = this.PLAYER_HEIGHT;

		this.tint = 0x00ff00;

		game.addChild(this);
	}

	private handleKeyPress(_dt: number) {
		if (this.INPUT_BUFFER <= Date.now() - this.INPUT_BUFFERING) {
			if (Keyboard.state.get("KeyW")) {
				this.position.y -= 64;
				this.INPUT_BUFFERING = Date.now();
				return;
			}
			if (Keyboard.state.get("KeyS")) {
				this.position.y += 64;
				this.INPUT_BUFFERING = Date.now();
				return;
			}
			if (Keyboard.state.get("KeyA")) {
				this.position.x -= 64;
				this.INPUT_BUFFERING = Date.now();
				return;
			}
			if (Keyboard.state.get("KeyD")) {
				this.position.x += 64;
				this.INPUT_BUFFERING = Date.now();
				return;
			}
		}
	}

	public update(dt: number) {
		this.handleKeyPress(dt);
	}

	public updateRect() {
		this.collisionBox.x = this.position.x;
		this.collisionBox.y = this.position.y;
	}

	public jump() {
	}
}
