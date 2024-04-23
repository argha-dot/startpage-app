import { IApplicationOptions } from "pixi.js";
import Game from "@/lib/game";
import { GameScene } from "@/components/games/typing/gameScene";
import { useEffect, useRef } from "react";

const GAME_CONFIG: Partial<IApplicationOptions> = {
  width: 600,
  height: 600,
  background: 0x242424,
  resolution: 1,
  hello: true,
  antialias: false,
};

const Typing = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    Game.init({
      ...GAME_CONFIG,
      width: (window.innerWidth * 95) / 100,
      height: (window.innerHeight * 90) / 100,
    });

    Game.add("main", new GameScene());

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
      <div
        style={{
          border: "1px red solid",
        }}
        ref={ref}
      ></div>
    </div>
  );
};

export default Typing;
