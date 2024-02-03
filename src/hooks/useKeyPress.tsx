import { useCallback, useEffect, useState } from "react";

interface OptionsOptions {
  callback: (e?: KeyboardEvent | null) => void;
  bypassInput?: string;
  onKeyDown?: (e?: KeyboardEvent | null) => void;
}

interface UseKeyPressOptions {
  targetKeys: {
    [key: string]: OptionsOptions;
  };
}

interface KeyPressedStateI {
  [key: string]: boolean;
}

function shouldBypassInput(
  eventTarget: EventTarget | null,
  bypassInputString: string | undefined,
): boolean {
  if (bypassInputString === "all") {
    return true;
  }
  return bypassInputString === (eventTarget as HTMLElement).id;
}

function isEventTargetInputOrTextArea(eventTarget: EventTarget | null) {
  if (eventTarget === null) return false;

  // console.log((eventTarget as HTMLElement).id);
  const eventTargetTagName = (eventTarget as HTMLElement).tagName.toLowerCase();
  return ["input", "textarea", "button"].includes(eventTargetTagName);
}

function useKeyPress({ targetKeys }: UseKeyPressOptions) {
  const [keyPressed, setKeyPressed] = useState<KeyPressedStateI>({});

  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      Object.keys(targetKeys).forEach((k) => {
        if (
          !isEventTargetInputOrTextArea(e.target) ||
          shouldBypassInput(e.target, targetKeys[k].bypassInput)
          // targetKeys[k].bypassInput === (e.target as HTMLElement).id
        ) {
          if (e.code === k) {
            setKeyPressed((prev) => {
              return {
                ...prev,
                [e.code]: true,
              };
            });
            e.preventDefault();

            targetKeys[k].onKeyDown?.(e);
          }
        }
      });
    },
    [targetKeys],
  );

  const upHandler = useCallback(
    (e: KeyboardEvent) => {
      Object.keys(targetKeys).forEach((k) => {
        if (e.code === k) {
          setKeyPressed((prev) => {
            return {
              ...prev,
              [e.code]: false,
            };
          });
          if (
            !isEventTargetInputOrTextArea(e.target) ||
            // targetKeys[k].bypassInput
            shouldBypassInput(e.target, targetKeys[k].bypassInput)
          ) {
            e.preventDefault();
            targetKeys[k].callback(e);
          }
        }
      });
    },
    [targetKeys],
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
