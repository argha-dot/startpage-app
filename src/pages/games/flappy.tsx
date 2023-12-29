import { useEffect, useRef } from "react";
import { GameScene } from "@/components/games/flappy/gameScene";
import Game from "@/lib/game";
import Keyboard from "@/lib/game/keyboard";
import { GAME_HEIGHT, GAME_WIDTH } from "@/components/games/flappy/consts";

const Flappy = () => {
  const ref = useRef<HTMLDivElement>(null);
  Game.init(GAME_WIDTH, GAME_HEIGHT, 0x70c5cd);

  useEffect(() => {
    console.log("heyy heyy");
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    ref.current.appendChild(Game.view);
    Keyboard.init();
    Game.changeScene(new GameScene());

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
