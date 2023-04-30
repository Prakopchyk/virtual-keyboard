class Key {
  symbol;
  code;
  alt;

  constructor(symbol, code, alt) {
    this.symbol = symbol;
    this.code = code;
    this.alt = alt ?? "";
  }
}

const kbKeys =
  [[
    new Key("`", "Backquote", "~"),
    new Key("1", "Digit1", "!"),
    new Key("2", "Digit2", "@"),
    new Key("3", "Digit3", "#"),
    new Key("4", "Digit4", "$"),
    new Key("5", "Digit5", "%"),
    new Key("6", "Digit6", "^"),
    new Key("7", "Digit7", "&"),
    new Key("8", "Digit8", "*"),
    new Key("9", "Digit9", "("),
    new Key("0", "Digit0", ")"),
    new Key("-", "Minus", "_"),
    new Key("=", "Equal", "+"),
    new Key("Backspace", "Backspace", "")
  ],
  [
    new Key("Tab", "Tab", ""),
    new Key("q", "KeyQ", ""),
    new Key("w", "KeyW", ""),
    new Key("e", "KeyE", ""),
    new Key("r", "KeyR", ""),
    new Key("t", "KeyT", ""),
    new Key("y", "KeyY", ""),
    new Key("u", "KeyU", ""),
    new Key("i", "KeyI", ""),
    new Key("o", "KeyO", ""),
    new Key("p", "KeyP", ""),
    new Key("[", "BracketLeft", "{"),
    new Key("]", "BracketRight", "}"),
    new Key('\\', "Backslash", '|'),
    new Key('Del', "Delete", '')
  ],
  [
    new Key("CapsLock", "CapsLock", ""),
    new Key("a", "KeyA", ""),
    new Key("s", "KeyS", ""),
    new Key("d", "KeyD", ""),
    new Key("f", "KeyF", ""),
    new Key("g", "KeyG", ""),
    new Key("h", "KeyH", ""),
    new Key("j", "KeyJ", ""),
    new Key("k", "KeyK", ""),
    new Key("l", "KeyL", ""),
    new Key(";", "Semicolon", ":"),
    new Key("'", "Quote", '"'),
    new Key("Enter", "Enter", "")
  ],
  [
    new Key("Shift", "ShiftLeft", ""),
    new Key("z", "KeyZ", ""),
    new Key("x", "KeyX", ""),
    new Key("c", "KeyC", ""),
    new Key("v", "KeyV", ""),
    new Key("b", "KeyB", ""),
    new Key("n", "KeyN", ""),
    new Key("m", "KeyM", ""),
    new Key(",", "Comma", "<"),
    new Key(".", "Period", ">"),
    new Key("/", "Slash", "?"),
    new Key("↑", "ArrowUp", ""),
    new Key("Shift", "ShiftRight", "")
  ],
  [
    new Key("CTRL", "ControlLeft", ""),
    new Key("Win", "MetaLeft", ""),
    new Key("Alt", "AltLeft", ""),
    new Key(" ", "Space", " "),
    new Key("Alt", "AltRight", ""),
    new Key("CTRL", "ControlRight", ""),
    new Key("←", "ArrowLeft", ""),
    new Key("↓", "ArrowDown", ""),
    new Key("→", "ArrowRight", "")
  ]];

// const keyBoardSymbols = ["`~", "!1", "@2", "#3", "$4", "%5", "^6", "&7", "*8", "(9", ")0", "-_", "+=", "Backspace",
//   "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "DEL",
//   "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "; ", "\n'", "ENTER",
//   "Shift", "z", "x", "c", "v", "b", "n", "m", ".", ", ", " / ", "ArrowUp", "Shift",
//   "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "ArrowLeft", "ArrowDown", "ArrowRight"];

let textArea = document.createElement('textarea');
textArea.classList.add('textarea');
textArea.setAttribute('autofocus', 'autofocus');
document.body.prepend(textArea);

let keyBoard = document.createElement('div');
keyBoard.classList.add('keyboard');
textArea.after(keyBoard);

let pressedButtonCode = null;
let isCapsLock = false;
let isShift = false;


window.addEventListener('keydown', (e) => {
  console.log(e)
  let button = getButton(e.code);
  if (button != null) {
    button.classList.add('pressed');
  }
  if (e.code === 'Enter') {
    textArea.value = textArea.value + '\n';
  }
  else if (e.code == 'Backspace') {
    if (textArea.value.length !== 0) {
      textArea.value = textArea.value.slice(0, -1);
    }
  }
  else if (e.code == 'CapsLock') {
    isCapsLock = !isCapsLock;
  }
  else if (e.code == 'Tab') {
    textArea.value = textArea.value + '\u00A0';
  }
  else if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
    isShift = true;
  }

  else {
    var symbol = e.key;
    if ((isCapsLock && !e.shiftKey) || (!isCapsLock && e.shiftKey)) {
      symbol = symbol.toUpperCase();
    }
    textArea.value = textArea.value + symbol;
  }

  e.preventDefault();
})


window.addEventListener('keyup', (e) => {
  // console.log(e)
  let button = getButton(e.code);
  if (button != null) {
    button.classList.remove('pressed');
  }

  if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
    isShift = false;
  }

  e.preventDefault();
})

function getButton(code) {
  var button = document.querySelector(`.button[data-key='${code}']`)

  return button;
}

function init() {
  let html = '';
  for (let i = 0; i < kbKeys.length; i++) {
    let row = kbKeys[i];
    for (let j = 0; j < row.length; j++) {
      html += `<button class="button" data-symbol="${row[j].symbol}" data-key="${row[j].code}" data-alt="${row[j].alt}"></button>`;
    }
  }
  document.querySelector('.keyboard').innerHTML = html;

  let allButtons = document.querySelectorAll(".button");

  allButtons.forEach(button => {
    button.addEventListener("mousedown", function () {
      let code = button.getAttribute('data-key');
      let symbol = button.getAttribute('data-symbol');
      pressedButtonCode = code;
      let alt = button.getAttribute('data-alt');
      if (isShift && alt !== '') {
        symbol = alt;
      }
      let event = new KeyboardEvent("keydown", { bubbles: true, code: `${code}`, key: `${symbol}`, shiftKey: isShift });
      // const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, code: "KeyQ", key: "Q", char: "Q", shiftKey: true });
      textArea.dispatchEvent(event);
    })
  })

  window.addEventListener("mouseup", function () {
    if (pressedButtonCode !== null) {
      console.log(pressedButtonCode)
      let event = new KeyboardEvent("keyup", { bubbles: true, code: `${pressedButtonCode}` });

      textArea.dispatchEvent(event);
    }
    pressedButtonCode = null;
  })
}

init();
