const input = document.getElementById('codeInput');
const runBtn = document.getElementById('runBtn');
const earth = document.getElementById('earth');
const bubble = document.getElementById('bubble');

let lastResponse = "";

function normalize(text) {
  if (!text) return "";
  return text.trim().toLowerCase().replace(/[.,;!?]/g, "");
}

function isHelloWorld(text) {
  const n = normalize(text);
  return n === "hello world" || n === "helloworld";
}

function respond(text) {
  bubble.style.opacity = "0";
  setTimeout(() => {
    bubble.textContent = text;
    bubble.style.opacity = "1";
  }, 150);
  lastResponse = text;
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

function runInput() {
  const value = input.value;
  if (isHelloWorld(value)) {
    respond("Hello");
  } else {
    respond("?");
  }
}

runBtn.addEventListener("click", runInput);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runInput();
  }
});

earth.addEventListener("click", () => {
  if (lastResponse) {
    respond(lastResponse);
  }
});
