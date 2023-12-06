import { sleep } from "./utility.js";
import { speed, barContainerExtra, clear_container_extra } from "../main.js";

/**
 * Merge Sort implementation w/ animation
 *  */
export async function merge_sort_recursive(array, l, r) {
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

/**
 * Displays a specified half of the merge process w/ animation
 */
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

/** Test to ensure merge sort logic works */
async function merge_test() {
  let array = [100, 5, 35, 2, 3, 4, 74, 19, 509, 4329, 5, 3];

  await merge_sort_recursive(array, 0, array.length - 1);
  console.log(array);
}
