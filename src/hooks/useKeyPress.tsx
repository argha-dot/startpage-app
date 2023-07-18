import { useCallback, useEffect, useState } from "react"

interface UseKeyPressOptions {
  targetKeys: {
    [key: string]: () => void
  }
}

interface keyPressedStateI {
  [key: string]: boolean
}

const useKeyPress = ({ targetKeys }: UseKeyPressOptions) => {
  const [keyPressed, setKeyPressed] = useState<keyPressedStateI>({});
  console.log(keyPressed)

  const downHandler = useCallback(({ code }: KeyboardEvent) => {
    Object.keys(targetKeys).map(k => {
      if (code === k) {
        setKeyPressed(prev => {
          return {
            ...prev,
            [ code ]: true
          }
        });
      }
    })
  }, [targetKeys])

  const upHandler = useCallback(({ code }: KeyboardEvent) => {
    Object.keys(targetKeys).map(k => {
      if (code === k) {
        setKeyPressed(prev => {
          return {
            ...prev,
            [ code ]: false
          }
        });
        targetKeys[k]()
      }
    })
  }, [targetKeys])

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, [downHandler, upHandler])

  return keyPressed
}

export default useKeyPress;
