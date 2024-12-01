import { Texture, Container, Sprite, Rectangle, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./consts";
import Game from "@/lib/game";
import { Vec2D } from "@/lib/game/vec";
import { Keyboard } from "@/lib/game/keyboard";

export default class Player extends Sprite {
	public collisionBox = new Rectangle();

	public PLAYER_WIDTH = 24;
	public PLAYER_HEIGHT = 32;
	private velocity: Vec2D = {
		x: 0,
		y: 0,
	}

	private rolling = 0;

	private dir: Vec2D = {
		x: 0,
		y: 0,
	};
	private dirSprite: Sprite;
	private movementSpeed = 10;

	constructor() {
		super(Texture.WHITE);
		this.dirSprite = new Sprite(Texture.WHITE);
	}

	public init(game: Container) {
		this.position.set(GAME_WIDTH / 2 - 32, GAME_HEIGHT / 2);

		this.height = this.PLAYER_HEIGHT;
		this.width = this.PLAYER_WIDTH;

		this.collisionBox.width = this.PLAYER_WIDTH;
		this.collisionBox.height = this.PLAYER_HEIGHT;

		Assets.load("/lineoff/dir.png").then((tex: Texture) => {
			this.dirSprite.texture = tex;
			this.dirSprite.width = this.dirSprite.texture.width;
			this.dirSprite.height = this.dirSprite.texture.height;
		});

		this.tint = 0x00ff00;
		this.dirSprite.anchor.set(0.5, 0.5);

		game.addChild(this.dirSprite);
		game.addChild(this);

		this.handleKeyPress();
	}


	// @ts-ignore
	private get _mouseDirection(): number {
		const x = Game.app.renderer.events.pointer.globalX;
		const y = Game.app.renderer.events.pointer.globalY;

		return Math.atan2(y - this.position.y, x - this.position.x);
	}

	private handleKeyPress() {
		const movement_speed = 10;
		if (Keyboard.isKeyDown("KeyW")) {
			this.dir.y = -1;
			if (!Keyboard.isKeyDown("KeyA", "KeyD")) {
				this.dir.x = 0;
			}
			this.movementSpeed = movement_speed;
		}
		if (Keyboard.isKeyReleased("KeyW")) {
			this.movementSpeed = 0;
		}

		if (Keyboard.isKeyDown("KeyS")) {
			this.dir.y = 1;
			if (!Keyboard.isKeyDown("KeyA", "KeyD")) {
				this.dir.x = 0;
			}
			this.movementSpeed = movement_speed;
		}
		if (Keyboard.isKeyReleased("KeyS")) {
			this.movementSpeed = 0;
		}

		if (Keyboard.isKeyDown("KeyA")) {
			this.dir.x = -1;
			if (!Keyboard.isKeyDown("KeyW", "KeyS")) {
				this.dir.y = 0;
			}
			this.movementSpeed = movement_speed;
		}
		if (Keyboard.isKeyReleased("KeyA")) {
			this.movementSpeed = 0;
		}

		if (Keyboard.isKeyDown("KeyD")) {
			this.dir.x = 1;
			if (!Keyboard.isKeyDown("KeyW", "KeyS")) {
				this.dir.y = 0;
			}
			this.movementSpeed = movement_speed;
		}
		if (Keyboard.isKeyReleased("KeyD")) {
			this.movementSpeed = 0;
		}

		if (Keyboard.isKeyPressed("Space")) {
			this.dodgeRoll();
		}
	}

	private handleMovement() {
		this.dirSprite.rotation = Math.atan2(this.dir.y, this.dir.x);
		this.velocity.x = this.dir.x * this.movementSpeed;
		this.velocity.y = this.dir.y * this.movementSpeed;
	}

	private dodgeRoll() {
		if (this.rolling !== 0) {
			console.log("Already rolling");
			return;
		}
		console.log("Rolling");
		this.rolling = 2;
		this.movementSpeed += 100;
	}

	public update(dt: number) {
		this.handleKeyPress();

		this.handleMovement();
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;

		if (this.rolling > 0) {
			this.rolling = Math.max(0, this.rolling - dt);
			console.log(this.rolling);
		}

		if (this.rolling === 0) {
			// this.velocity.x = 0;
			// this.velocity.y = 0;
			this.movementSpeed = 0;
		}

		this.updateRect();
	}

	public updateRect() {
		this.collisionBox.x = this.position.x;
		this.collisionBox.y = this.position.y;

		this.collisionBox.width = this.width;
		this.collisionBox.height = this.height;

		this.dirSprite.x = this.position.x + this.width / 2;
		this.dirSprite.y = this.position.y + this.height / 2;
	}
}
