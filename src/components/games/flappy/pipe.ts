import { Assets, Container, Sprite, Texture } from "pixi.js";
import { GAME_WIDTH, GROUND_HEIGHT, GROUND_SPEED, PIPE_GAP } from "./consts";
import { randInt } from "@/lib/utils";

export default class PipesHandler {
  public pipes: Pipe[] = [];
  public pipeFrequency = 1500;
  public lastPipe = Date.now();

  constructor() {}

  public destroy() {
    this.pipes.forEach((pipe) => {
      pipe.destroy({
        children: true,
      });
    });

    this.pipes = [];
  }

  public update(deltaTime: number = 1, game: Container) {
    this.pipes.forEach((pipe, index, pipes) => {
      pipe.update(deltaTime);

      if (pipe.x < -60) {
        pipe.destroy({
          children: true,
        });

        pipes.splice(index, 1);
      }
    });

    if (Date.now() - this.lastPipe > this.pipeFrequency) {
      this.lastPipe = Date.now();

      const pipe = new Pipe();
      this.pipes.push(pipe);
      game.addChildAt(pipe, 1);
    }
  }
}

export class Pipe extends Container {
  public topPipe: Sprite;
  public bottomPipe: Sprite;
  private randomDistance = randInt(0, 300);

  constructor() {
    super();

    this.topPipe = new Sprite(Texture.WHITE);
    this.bottomPipe = new Sprite(Texture.WHITE);

    this.createPipes();
  }

  private createPipes() {
    this.x = GAME_WIDTH;

    Assets.load("/flap/pipe.png").then((texture: Texture) => {
      this.bottomPipe.texture = texture;

      const rotatedTexture = new Texture(texture.baseTexture);
      rotatedTexture.rotate = 8;

      this.topPipe.texture = rotatedTexture;
    });

    this.topPipe.width = 60;
    this.topPipe.height = GROUND_HEIGHT;
    this.topPipe.y =
      (-5 * GROUND_HEIGHT) / 6 - PIPE_GAP / 2 + this.randomDistance;

    this.bottomPipe.width = 60;
    this.bottomPipe.height = GROUND_HEIGHT;
    this.bottomPipe.y = GROUND_HEIGHT / 6 + PIPE_GAP / 2 + this.randomDistance;

    this.addChild(this.topPipe, this.bottomPipe);
  }

  public update(deltaTime: number = 1) {
    this.x -= GROUND_SPEED * deltaTime;
  }
}
