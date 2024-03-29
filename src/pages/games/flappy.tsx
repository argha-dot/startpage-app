import { useEffect, useRef } from "react";
import { GameScene } from "@/components/games/flappy/gameScene";
// import Keyboard from "@/lib/game/keyboard";
import { GAME_HEIGHT, GAME_WIDTH } from "@/components/games/flappy/consts";
import Game from "@/lib/game";
import { IApplicationOptions } from "pixi.js";

const GAME_CONFIG: Partial<IApplicationOptions> = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  background: 0x70c5cd,
  resolution: 1,
  hello: true,
  antialias: false,
};

const Flappy = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  Game.init(GAME_CONFIG);

  Game.add("main", new GameScene());

  useEffect(() => {
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    ref.current.appendChild(Game.view);
    Game.start("main");

    return () => {};
  }, [ref]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={ref}></div>
    </div>
  );
};

export default Flappy;
