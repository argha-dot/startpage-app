import { useEffect, useRef, useState } from "react";

const useDraggable = () => {
  const [pressed, setPressed] = useState(false);

  const position = useRef({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (_: MouseEvent) => {
      console.log("down");
      setPressed(true);
    };

    const handleMove = (e: MouseEvent) => {
      if (pressed) {
        if (!ref.current || !position.current) {
          return;
        }

        const pos = position.current;
        const elem = ref.current;

        position.current.x = pos.x + e.offsetX;
        position.current.y = pos.y + e.offsetY;
        console.log(pos, e.offsetX, e.offsetY);

        elem.style.top = `${pos.x}px`;
        elem.style.left = `${pos.y}px`;
      }
    };

    const handleMouseUp = (_: MouseEvent) => {
      console.log("up");
      setPressed(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      // document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed]);

  return [ref];
};

export default useDraggable;
