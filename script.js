const input = document.getElementById('codeInput');
const runBtn = document.getElementById('runBtn');
const earth = document.getElementById('earth');
const bubble = document.getElementById('bubble');

let lastResponse = "";

// make sure the text is clean and easy to check
function normalize(text) {
  if (!text) return "";
  return text.trim().toLowerCase().replace(/[.,;!?]/g, "");
}

// if user typed hello world
function isHelloWorld(text) {
  const n = normalize(text);
  return n === "hello world" || n === "helloworld";
}

// update the speech bubble and let the computer speak “Hello”
function respond(text) {
  bubble.style.opacity = "0";
  setTimeout(() => {
    bubble.textContent = text;
    bubble.style.opacity = "1";
  }, 150);

  lastResponse = text;

  // only speak when it’s “Hello”
  if (text === "Hello") {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance("Hello");
      utter.lang = "en-US";
      utter.rate = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }
}

// main function: check input and give a response
function runInput() {
  const value = input.value;
  if (isHelloWorld(value)) {
    respond("Hello");
  } else {
    respond("?");
  }
}

// run when button is clicked
runBtn.addEventListener("click", runInput);

// also run when press Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runInput();
  }
});

// if user clicks on earth, repeat the last response
earth.addEventListener("click", () => {
  if (lastResponse) {
    respond(lastResponse);
  }
});
