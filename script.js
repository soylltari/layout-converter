const letters = {
  q: "й",
  w: "ц",
  e: "у",
  r: "к",
  t: "е",
  y: "н",
  u: "г",
  i: "ш",
  o: "щ",
  p: "з",
  "[": "х",
  "]": "ї",
  a: "ф",
  s: "і",
  d: "в",
  f: "а",
  g: "п",
  h: "р",
  j: "о",
  k: "л",
  l: "д",
  ";": "ж",
  "'": "є",
  z: "я",
  x: "ч",
  c: "с",
  v: "м",
  b: "и",
  n: "т",
  m: "ь",
  ",": "б",
  ".": "ю",
  "?": ",",
  "/": ".",
};

// function for adding exceptions to objects(in case there are more languages in the future)
function addException(object, key, value) {
  object[key] = value;
}

//create object with upper-case elements
const capitalLetters = Object.fromEntries(
  Object.entries(letters).map(([key, value]) => [
    key.toUpperCase(),
    value.toUpperCase(),
  ])
);

addException(capitalLetters, "<", "Б");
addException(capitalLetters, ">", "Ю");
addException(capitalLetters, "{", "Х");
addException(capitalLetters, "}", "Ї");
addException(capitalLetters, ":", "Ж");
addException(capitalLetters, '"', "Є");

//create objects with swapped keys and values
function swapObject(obj) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}

const swappedLetters = swapObject(letters);
const swappedCapitalLetters = swapObject(capitalLetters);

//merge objects for better iteration
const initialObjects = { ...capitalLetters, ...letters };
const swappedObjects = { ...swappedCapitalLetters, ...swappedLetters };
//for outputting the result
const inputText = document.querySelector("#textarea");
const outputText = document.querySelector(".output");

function converter() {
  const input = inputText.value;
  outputText.value = "";
  const output = [...input].map(char =>
    initialObjects[char] ?? swappedObjects[char] ?? char
  );
  outputText.value = output.join("");
}

//function to clear input
function clear() {
  inputText.value = "";
  outputText.value = "";
}

//function to copy the result
function copy() {
  const copyInput = outputText.value;
  if (copyInput) {
    navigator.clipboard.writeText(copyInput);
    copyHint();
  }
}
//function that appears when the result is copied
function copyHint() {
  const hint = document.querySelector(".hint");
  hint.classList.add("show-hint");
  setTimeout(function () {
    hint.classList.remove("show-hint");
  }, 1200);
}

document.querySelector(".b-convert").addEventListener("click", converter);
document.querySelector(".b-clear").addEventListener("click", clear);
document.querySelector(".b-copy").addEventListener("click", copy);
