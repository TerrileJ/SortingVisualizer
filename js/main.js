import bubble_sort from "./modules/bubble-sort.js";
import { merge_sort_recursive } from "./modules/merge-sort.js";

let sortBtn = document.getElementById("sortBtn");
let genBtn = document.getElementById("genBtn");
let barContainer = document.getElementById("bars_container");
export let barContainerExtra = document.getElementById("bars_container_extra");
let sortMethodLinks = document.querySelectorAll(".nav-links");
let bar_slider = document.getElementById("bar-range");
let speed_slider = document.getElementById("speed-range");

/* bar generation */
let min = 1;
let max = 200;
let numBars = bar_slider.value;
let bar_arr = new Array(numBars);
export let speed = speed_slider.value / 10.0;
let sorting = false;

function genArray() {
  for (let i = 0; i < numBars; i++) {
    bar_arr[i] = randomNumber(min, max);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

/** Clears visualization area 2 of all bars */
export function clear_container_extra() {
  while (barContainerExtra.firstChild) {
    barContainerExtra.removeChild(barContainerExtra.firstChild);
  }
}

/* rendering */
let sort = bubble_sort;
function selectSort(e) {
  if (sorting) return;

  // remove border from any existing elements
  sortMethodLinks.forEach((item) => {
    item.classList.remove("select-border");
  });

  // add border to link that got clicked
  this.classList.add("select-border");

  // assign the correct sort function
  switch (this.textContent) {
    case "MergeSort":
      sort = merge_sort_recursive;
      break;
    case "QuickSort":
      break;
    case "HeapSort":
      break;
    default:
      sort = bubble_sort;
  }
}

sortMethodLinks.forEach((item) => {
  item.addEventListener("click", selectSort);
});

document.addEventListener("DOMContentLoaded", function () {
  genArray();
  renderArray(bar_arr);
});

bar_slider.oninput = function () {
  if (!sorting) {
    numBars = this.value;
    bar_arr = new Array(numBars);
    clear();
    genArray();
    renderArray(bar_arr);
  }
};

speed_slider.oninput = function () {
  speed = this.value / 10.0;
};

genBtn.addEventListener("click", function () {
  if (!sorting) {
    clear();
    genArray();
    renderArray(bar_arr);
  }
});

sortBtn.addEventListener("click", function () {
  if (!sorting) {
    // freeze other functionality
    sorting = true;
    sort_freeze(true);

    // sort
    sort(bar_arr, 0, bar_arr.length - 1).then(function (result) {
      sorting = false;
      sort_freeze(false);
    });
  }
});

function sort_freeze(condition) {
  if (condition) {
    genBtn.classList.add("disable");
    sortBtn.classList.add("disable");
    sortMethodLinks.forEach((item) => {
      item.classList.add("disable");
    });
    bar_slider.disabled = true;
  } else {
    genBtn.classList.remove("disable");
    sortBtn.classList.remove("disable");
    sortMethodLinks.forEach((item) => {
      item.classList.remove("disable");
    });
    bar_slider.disabled = false;
  }
}
