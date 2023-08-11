import { useCallback, useEffect, useState } from "react";

interface UseKeyPressOptions {
  targetKeys: {
    [key: string]: () => void;
  };
}

interface KeyPressedStateI {
  [key: string]: boolean;
}

function isEventTargetInputOrTextArea(eventTarget: EventTarget | null) {
  if (eventTarget === null) return false;

  const eventTargetTagName = (eventTarget as HTMLElement).tagName.toLowerCase();
  return ["input", "textarea", "button"].includes(eventTargetTagName);
}

function useKeyPress({ targetKeys }: UseKeyPressOptions) {
  const [keyPressed, setKeyPressed] = useState<KeyPressedStateI>({});

  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!isEventTargetInputOrTextArea(e.target)) {
        Object.keys(targetKeys).map((k) => {
          if (e.code === k) {
            setKeyPressed((prev) => {
              return {
                ...prev,
                [e.code]: true,
              };
            });
            e.preventDefault();
          }
        });
      }
    },
    [targetKeys]
  );

  const upHandler = useCallback(
    (e: KeyboardEvent) => {
      Object.keys(targetKeys).map((k) => {
        if (e.code === k) {
          setKeyPressed((prev) => {
            return {
              ...prev,
              [e.code]: false,
            };
          });
          if (k == "Escape") {
            targetKeys[k]();
          }
          if (!isEventTargetInputOrTextArea(e.target)) {
            e.preventDefault();
            targetKeys[k]();
          }
        }
      });
    },
    [targetKeys]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}

export default useKeyPress;
