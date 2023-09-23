import { GameScene } from "@/components/game/gameScene";
import Game from "@/lib/game";
import Keyboard from "@/lib/game/keyboard";
import { useEffect, useRef } from "react";

const GamesPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  Game.init(512, 512, 0xbbada0);

  useEffect(() => {
    if (ref.current?.firstElementChild) {
      return;
    }
    ref.current?.appendChild(Game.view);
    Keyboard.init();
    Game.changeScene(new GameScene());

    return () => {};
  }, [ref]);

  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
};

export default GamesPage;
