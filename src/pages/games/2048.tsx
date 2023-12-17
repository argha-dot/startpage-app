import { useEffect, useRef } from "react";
import { StartScene } from "@/components/games/2048/startScene";
import Game from "@/lib/game";
import Keyboard from "@/lib/game/keyboard";

const TwoZero48 = () => {
  const ref = useRef<HTMLDivElement>(null);
  Game.init(512, 512, 0xbbada0);

  useEffect(() => {
    if (!ref.current || ref.current?.firstElementChild) {
      return;
    }

    ref.current.appendChild(Game.view);
    Keyboard.init();
    Game.changeScene(new StartScene());

    return () => {};
  }, [ref]);

  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
};

export default TwoZero48;
