let sortBtn = document.getElementById("sortBtn");
let genBtn = document.getElementById("genBtn");
let barContainer = document.getElementById("bars_container");
let barContainerExtra = document.getElementById("bars_container_extra");
let sortMethodLinks = document.querySelectorAll(".nav-links");
let bar_slider = document.getElementById("bar-range");
let speed_slider = document.getElementById("speed-range");

/* bar generation */
let min = 1;
let max = 200;
let numBars = bar_slider.value;
let bar_arr = new Array(numBars);
let speed = speed_slider.value / 10.0;
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
    sort(bar_arr, 0, bar_arr.length - 1);
  }
});

/* sort methods */
function basic_sort(array) {
  array.sort(function (a, b) {
    return a - b;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sort_freeze(condition) {
  if (condition) {
    genBtn.classList.add("disable");
    sortBtn.classList.add("disable");
    sortMethodLinks.forEach((item) => {
      item.classList.add("disable");
    });
  } else {
    genBtn.classList.remove("disable");
    sortBtn.classList.remove("disable");
    sortMethodLinks.forEach((item) => {
      item.classList.remove("disable");
    });
  }
}

/** Bubble Sort */
async function bubble_sort(array, l, r) {
  // conditions for sort animation
  sorting = true;
  sort_freeze(true);

  // algorithm
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // bars currently compared
      bars[j].style.backgroundColor = "#203354";
      bars[j + 1].style.backgroundColor = "#203354";
      await sleep(500 / speed);

      // bars not in correct order
      if (array[j] > array[j + 1]) {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(100 / speed);
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
        await sleep(500 / speed);
      }

      // bar color reset
      bars[j].style.backgroundColor = "#b0bbc0";
      bars[j + 1].style.backgroundColor = "#b0bbc0";
      await sleep(100 / speed);
    }
    // sorted bar set to green
    bars[array.length - i - 1].style.backgroundColor = "lightgreen";
  }
  bars[0].style.backgroundColor = "lightgreen";

  // reset sort conditions
  sorting = false;
  sort_freeze(false);
}

/** Merge Sort - Iterative (for Animation) */

/** Merge Sort - Recursive (for Records) */
async function merge_test() {
  let array = [100, 5, 35, 2, 3, 4, 74, 19, 509, 4329, 5, 3];

  await merge_sort_recursive(array, 0, array.length - 1);
  console.log(array);
}

async function merge_sort_recursive(array, l, r) {
  // allows us to start from subproblem,
  if (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    await merge_sort_recursive(array, l, mid);
    await merge_sort_recursive(array, mid + 1, r);

    await merge_recursive(array, l, mid, r);
  }
}

async function merge_recursive(array, l, m, r) {
  // initialize both halves into their own arrays
  let subArrayOne = new Array(m - l + 1);
  let subArrayTwo = new Array(r - m);

  for (let i = 0; i < subArrayOne.length; i++) {
    subArrayOne[i] = array[i + l];
  }

  for (let i = 0; i < subArrayTwo.length; i++) {
    subArrayTwo[i] = array[i + m + 1];
  }

  let bars = document.getElementsByClassName("bar");
  await merge_sort_display_halves(array, bars, l, m, r);
  let barsExtra = document.getElementsByClassName("bar-extra");

  // go through both sorted halves, sorting them into original array
  let ptrOne = 0;
  let ptrTwo = 0;
  let kPtr = l;

  while (ptrOne < subArrayOne.length && ptrTwo < subArrayTwo.length) {
    barsExtra[ptrOne].style.backgroundColor = "#203354";
    barsExtra[subArrayOne.length + ptrTwo].style.backgroundColor = "#203354";
    await sleep(500 / speed);

    // sort alg
    if (subArrayOne[ptrOne] < subArrayTwo[ptrTwo]) {
      array[kPtr] = subArrayOne[ptrOne];

      barsExtra[ptrOne].style.backgroundColor = "lightgreen";
      barsExtra[subArrayOne.length + ptrTwo].style.backgroundColor = "#b0bbc0";
      await sleep(500 / speed);

      bars[kPtr].style.height = barsExtra[ptrOne].style.height;
      await sleep(500 / speed);

      ptrOne++;
      kPtr++;
    } else {
      array[kPtr] = subArrayTwo[ptrTwo];

      barsExtra[subArrayOne.length + ptrTwo].style.backgroundColor =
        "lightgreen";
      barsExtra[ptrOne].style.backgroundColor = "#b0bbc0";
      await sleep(500 / speed);

      bars[kPtr].style.height =
        barsExtra[subArrayOne.length + ptrTwo].style.height;
      await sleep(500 / speed);

      ptrTwo++;
      kPtr++;
    }
  }

  while (ptrOne < subArrayOne.length) {
    bars[kPtr].style.height = barsExtra[ptrOne].style.height;
    await sleep(500 / speed);

    array[kPtr] = subArrayOne[ptrOne];
    ptrOne++;
    kPtr++;
  }

  while (ptrTwo < subArrayTwo.length) {
    bars[kPtr].style.height =
      barsExtra[subArrayOne.length + ptrTwo].style.height;
    await sleep(500 / speed);

    array[kPtr] = subArrayTwo[ptrTwo];
    ptrTwo++;
    kPtr++;
  }

  clear_container_extra();
}

async function merge_sort_display_halves(array, bars, l, m, r) {
  await display_half(array, bars, l, m); // left half
  await display_half(array, bars, m + 1, r); // right half
}

async function display_half(array, bars, start, end) {
  // highlight left half
  for (let i = start; i <= end; i++) {
    bars[i].style.backgroundColor = "#203354";
  }
  await sleep(500 / speed);

  // make left half appear in 2nd area
  for (let i = start; i <= end; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add("bar-extra");
    bar.style.height = `${array[i]}px`;
    barContainerExtra.appendChild(bar);

    if (i == end) bar.style.marginRight = "150px";
  }
  await sleep(500 / speed);

  // Unhighlight left half
  for (let i = start; i <= end; i++) {
    bars[i].style.backgroundColor = "#b0bbc0";
  }
  await sleep(500 / speed);
}
function clear_container_extra() {
  while (barContainerExtra.firstChild) {
    barContainerExtra.removeChild(barContainerExtra.firstChild);
  }
}
