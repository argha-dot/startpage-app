/**
  * The type of the key event, it has the keyboard event and some extra properties
*/
export type KeyEvent = KeyboardEvent & {
  wasReleased: boolean;
  alreadyPressed: boolean;
}
/**
  * The keyboard class, it handles the keyboard events and keeps track of the keys that are pressed
  * and released. More suitable for games, where you want to know if a key is pressed or released and on what 
  * frame it was pressed or released.
*/
export class Keyboard {
  public static readonly state: Map<string, KeyEvent> = new Map();

  public static init() {
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }

  /**
    * Updates the state of the keys and deletes the keys that were released
    * Use it in the update loop of your game
  */
  public static update() {
    Keyboard.state.forEach((kEvent, key) => {
      kEvent.alreadyPressed = true;

      if (kEvent.wasReleased) {
        Keyboard.state.delete(key);
      }
    })
  }

  /** 
    * Checks if the keys are held down
    * @param args Keys to check
    * @returns true if the key is held down
  */
  public static isKeyDown(...args: string[]): boolean {
    return args.some(arg => {
      const kEvent = Keyboard.state.get(arg);
      return kEvent && !kEvent.wasReleased;
    });
  }

  /**
    * Checks if the keys are not held down
    * @param args Keys to check
    * @returns true if the key is not held down
  */
  public static isKeyUp(...args: string[]): boolean {
    return !Keyboard.isKeyDown(...args);
  }

  /**
    * Checks if the key was just pressed, it won't return true if the key is being held down, 
    * just for the initial frame. For checking if the key is being held down, 
    * use {@link isKeyDown}
    * @param args Keys to check
    * @returns true if the key is pressed
  */
  public static isKeyPressed(...args: string[]): boolean {
    let res = false;

    if (args.length === 0) {
      return false;
    }

    for (const arg of args) {
      const kEvent = Keyboard.state.get(arg);
      if (kEvent && !kEvent.alreadyPressed && !kEvent.wasReleased) {
        res = true;
      }
    }

    return res;
  }


  /**
    * Checks if the key was just pressed, it won't return true for any subsequent frames
    * for checking if the key is released, use {@link isKeyUp}
    * @param args Keys to check
    * @returns true if the key is pressed
  */
  public static isKeyReleased(...args: string[]): boolean {
    let res = false;
    if (args.length === 0) {
      return false;
    }
    for (const arg of args) {
      const kEvent = Keyboard.state.get(arg);
      if (kEvent && kEvent.wasReleased) {
        res = true;
      }
    }

    return res;
  }

  /**
    * The Event Handler for key down event
  */
  private static keyDown(e: KeyboardEvent) {
    Keyboard.state.set(e.code, {
      ...e,
      alreadyPressed: false,
      wasReleased: false,
    });
  }


  /**
    * The Event Handler for key up event
  */
  private static keyUp(e: KeyboardEvent) {
    const keyEvent = Keyboard.state.get(e.code);
    if (keyEvent) {
      keyEvent.wasReleased = true;
    }
  }

  /**
    * Clears the state
  */
  public static clear() {
    Keyboard.state.clear();
  }

  /**
    * Removes all listeners and clears the state
  */
  public static stop() {
    Keyboard.clear();

    document.removeEventListener("keyup", Keyboard.keyUp);
    document.removeEventListener("keydown", Keyboard.keyDown);
  }
}

interface keyboardCodes {
  isDown: boolean;
  isUp: boolean;
  press?: () => void;
  release?: () => void;
}

/**
  * The keyboard class, it handles the keyboard events and by giving you a register function,
  * where you can register the key and the callback functions for when the key is pressed and released.
  * More suitable for web apps, where you don't have something like a game loop.

*/
export class keyboard {
  public static codes: { [code: string]: keyboardCodes } = {};

  /**
    * The event handler for the key down event
    * @param KeyboardEvent e The keyboard event
  */
  private static downHandler = (e: KeyboardEvent) => {
    let key = keyboard.codes[e.code];
    if (key) {
      if (key.isUp && key.press) key.press();
      key.isUp = false;
      key.isDown = true;
    }
  };

  /**
    * The event handler for the key up event
    * @param KeyboardEvent e The keyboard event
  */
  private static upHandler = (e: KeyboardEvent) => {
    let key = keyboard.codes[e.code];
    if (key) {
      if (key.isDown && key.release) key.release();
      key.isUp = true;
      key.isDown = false;
    }
  };

  /**
    * Registers a key to the handler
    * @param string keyCode The key code to register
    * @param {() => void} [press] The callback to fire when the key is pressed
    * @param {() => void} [release] The callback to fire when the key is released
  */
  public static registerKey = (
    keyCode: string,
    press?: () => void,
    release?: () => void,
  ) => {
    // keyboard.codes[keyCode] = {}
    keyboard.codes[keyCode] = {
      isDown: false,
      isUp: true,
      press: press,
      release: release,
    };
  };

  public static init() {
    document.addEventListener("keydown", keyboard.downHandler, false);
    document.addEventListener("keyup", keyboard.upHandler, false);
  }

  public static stop() {
    document.removeEventListener("keydown", keyboard.downHandler, false);
    document.removeEventListener("keyup", keyboard.upHandler, false);
  }
}

export default Keyboard;
