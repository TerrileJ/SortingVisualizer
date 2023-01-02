let sortBtn = document.getElementById("sortBtn");
let genBtn = document.getElementById("genBtn");
let barContainer = document.getElementById("bars_container");

let min = 1;
let max = 200;
let numBars = 5;
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

function basic_sort(array) {
  array.sort(function (a, b) {
    return a - b;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubble_sort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // bars currently compared
      bars[j].style.backgroundColor = "#203354";
      bars[j + 1].style.backgroundColor = "#203354";
      await sleep(500);

      // bars not in correct order
      if (array[j] > array[j + 1]) {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(100);
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
        await sleep(500);
      }

      // bar color reset
      bars[j].style.backgroundColor = "#b0bbc0";
      bars[j + 1].style.backgroundColor = "#b0bbc0";
      await sleep(100);
    }
    // sorted bar set to green
    bars[array.length - i - 1].style.backgroundColor = "lightgreen";
  }
  bars[0].style.backgroundColor = "lightgreen";
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

sortBtn.addEventListener("click", function () {
  bubble_sort(bar_arr);
});

/**
 * 1. Specify a range of values for my array
 * 2. Make function to create an array of random values
 * 3. generate random bars upon page loading
 * 4. have btn randomly generate new array on click
 * 5. sort animation
 */
