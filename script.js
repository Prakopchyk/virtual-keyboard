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

const kbKeys = [
  new Key("1", "Digit1", "!"),
  new Key("q", "KeyQ"),
];

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

window.addEventListener('keydown', (e) => {
  console.log(e)
  let button = getButton(e.code);
  if (button != null) {
    button.classList.add('pressed');
  }
  e.preventDefault();
})

window.addEventListener('keyup', (e) => {
  console.log(e)
  let button = getButton(e.code);
  if (button != null) {
    button.classList.remove('pressed');
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
    let key = kbKeys[i];
    html += `<div class="button" data-symbol="${key.symbol}" data-key="${key.code}" data-alt="${key.alt}"></div>`;
  }
  document.querySelector('.keyboard').innerHTML = html;

  let allButtons = document.querySelectorAll(".button");

  allButtons.forEach(button => {
    button.addEventListener("mousedown", function () {

      let code = button.getAttribute('data-key');
      let symbol = button.getAttribute('data-symbol');
      const event = new KeyboardEvent("keydown", { bubbles: true, code: `${code}` });

      textArea.dispatchEvent(event);

      textArea.value = textArea.value + symbol;
    })

    button.addEventListener("mouseup", function () {
      let code = button.getAttribute('data-key');
      const event = new KeyboardEvent("keyup", { bubbles: true, code: `${code}` });

      textArea.dispatchEvent(event);
    })
  })
}

init();
