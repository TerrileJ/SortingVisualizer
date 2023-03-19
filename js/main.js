let sortBtn = document.getElementById("sortBtn");
let genBtn = document.getElementById("genBtn");
let barContainer = document.getElementById("bars_container");
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
      sort = merge_sort;
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

async function bubble_sort(array, l, r) {
  sorting = true;
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

  sorting = false;
}

async function merge_sort(array, l, r) {
  // split into halves and merge
  if (l < r) {
    let m = Math.floor((r - l) / 2) + l;
    // console.log("L is " + l);
    // console.log("R is " + r);
    // console.log("M is " + m);

    merge_sort(array, l, m);
    merge_sort(array, m + 1, r);

    merge(array, l, m, r);
  }
}

async function merge(array, l, m, r, speed) {
  // create half arrays
  let subArrayOne = new Array(m - l + 1);
  let subArrayTwo = new Array(r - m);

  for (let i = 0; i < subArrayOne.length; i++) {
    subArrayOne[i] = array[l + i];
  }

  for (let i = 0; i < subArrayTwo.length; i++) {
    subArrayTwo[i] = array[m + 1 + i];
  }

  let ptrOne = 0;
  let ptrTwo = 0;

  // compare values in each half, and then assign smallest to pos in original array
  while (ptrOne < subArrayOne.length && ptrTwo < subArrayTwo.length) {
    if (subArrayOne[ptrOne] < subArrayTwo[ptrTwo]) {
      array[l] = subArrayOne[ptrOne];
      ptrOne++;
    } else {
      array[l] = subArrayTwo[ptrTwo];
      ptrTwo++;
    }
    l++;
  }

  // assign any remainder values
  while (ptrOne < subArrayOne.length) {
    array[l] = subArrayOne[ptrOne];
    l++;
    ptrOne++;
  }

  while (ptrTwo < subArrayTwo.length) {
    array[l] = subArrayTwo[ptrTwo];
    l++;
    ptrTwo++;
  }
}
