import { IApplicationOptions } from "pixi.js";
import { useEffect, useRef } from "react";
import SceneManager from "@/lib/scenes/sceneManager";
import GameScene from "@/components/games/dino/scenes/gameScene";

const GAME_CONFIG: Partial<IApplicationOptions> = {
  width: 600,
  height: 600,
  hello: true,
  resolution: 1,
  backgroundColor: 0xffffff,
  antialias: false,
};

const Dino = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  SceneManager.init(GAME_CONFIG);

  SceneManager.add("main", new GameScene());

  useEffect(() => {
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    ref.current.appendChild(SceneManager.view);
    SceneManager.start("main");
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

export default Dino;
