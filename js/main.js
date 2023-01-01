let sortBtn = document.getElementById("sortBtn");
let genBtn = document.getElementById("genBtn");
let barContainer = document.getElementById("bars_container");

let min = 1;
let max = 200;
let numBars = 20;
let bar_arr = new Array(numBars);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genArray() {
  for (let i = 0; i < numBars; i++) {
    bar_arr[i] = randomNumber(min, max);
  }
}

function renderArray(array) {
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${array[i]}px`;
    barContainer.appendChild(bar);
  }
}

function clear() {
  while (barContainer.firstChild) {
    barContainer.removeChild(barContainer.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  genArray();
  renderArray(bar_arr);
});

genBtn.addEventListener("click", function () {
  clear();
  genArray();
  renderArray(bar_arr);
});
/**
 * 1. Specify a range of values for my array
 * 2. Make function to create an array of random values
 * 3. generate random bars upon page loading
 * 4. have btn randomly generate new array on click
 */
