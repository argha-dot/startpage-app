class Keyboard {
  public static readonly state: Map<string, boolean> = new Map();

  public static init() {
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }

  private static keyDown(e: KeyboardEvent) {
    Keyboard.state.set(e.code, true);
  }

  private static keyUp(e: KeyboardEvent) {
    Keyboard.state.set(e.code, false);
  }

  public static remove() {
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

export class keyboard {
  private static codes: { [code: string]: keyboardCodes } = {};

  private static downHandler = (e: KeyboardEvent) => {
    let key = keyboard.codes[e.code];
    if (key) {
      if (key.isUp && key.press) key.press();
      key.isUp = false;
      key.isDown = true;
    }
  };

  private static upHandler = (e: KeyboardEvent) => {
    let key = keyboard.codes[e.code];
    if (key) {
      if (key.isDown && key.release) key.release();
      key.isUp = true;
      key.isDown = false;
    }
  };

  public static registerKey = (
    keyCode: string,
    press?: () => void,
    release?: () => void
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
}

export default Keyboard;
