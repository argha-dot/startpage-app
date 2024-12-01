import GameScene from "@/components/games/2048/gameScene";
import Game from "@/lib/game";
import { IApplicationOptions } from "pixi.js";
import { useEffect, useRef } from "react";

const GAME_CONFIG: Partial<IApplicationOptions> = {
  width: 600,
  height: 600,
  hello: true,
  resolution: 1,
  backgroundColor: 0x343434,
  antialias: true,
}

const TwentyFortyEight = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  Game.init(GAME_CONFIG);

  Game.add("main", new GameScene());

  useEffect(() => {
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    ref.current.appendChild(Game.view);
    Game.start("main");
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

export default TwentyFortyEight;
