let cards = [];
let index = 0;
let showMeaning = true;

const card = document.getElementById("card");

// Fetch vocab from Flask
fetch("/vocab")
  .then(res => res.json())
  .then(data => {
    cards = data;
    show();  // show first card
  })
  .catch(err => console.error("Failed to load vocab:", err));

function show() {
  if (!cards.length) return;

  document.getElementById("term").innerText = cards[index].term;
  document.getElementById("meaning").innerText = cards[index].meaning; // always show
  document.getElementById("explanation").innerText = cards[index].explanation;
  document.getElementById("progress").innerText = `${index + 1} / ${cards.length}`;

  // small animation
  card.style.transform = "scale(0.95)";
  setTimeout(() => card.style.transform = "scale(1)", 100);
}

// Flip on click
card.addEventListener("click", () => {
  showMeaning = !showMeaning;
  show();
});

// Swipe support
let startX = 0;
card.addEventListener("touchstart", e => startX = e.touches[0].clientX);
card.addEventListener("touchend", e => {
  let diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) prev();
  if (diff < -50) next();
});

// Keyboard arrows
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

function next() {
  index = (index + 1) % cards.length;
  showMeaning = false;
  show();
}

function prev() {
  index = (index - 1 + cards.length) % cards.length;
  showMeaning = false;
  show();
}
