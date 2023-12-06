import { speed } from "../main.js";
import { sleep } from "./utility.js";

export default async function quick_sort(array, l, r) {
  if (l > r) return;
  let bars = document.getElementsByClassName("bar");

  // pick pivot as last element
  let pivot = r;
  bars[pivot].style.backgroundColor = "yellow";
  await sleep(250 / speed);

  let i = l - 1,
    j = l;

  while (j <= pivot) {
    // bars currently compared
    bars[j].style.backgroundColor = "#203354";
    await sleep(250 / speed);

    if (array[j] <= array[pivot]) {
      i++;

      bars[j].style.backgroundColor = "red";
      await sleep(250 / speed);

      bars[i].style.backgroundColor = "#203354";
      await sleep(250 / speed);

      // swap
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      bars[j].style.height = array[j] + "px";
      bars[j].style.backgroundColor = "#b0bbc0";
      bars[i].style.height = array[i] + "px";
      if (j == pivot) bars[i].style.backgroundColor = "yellow";
      else bars[i].style.backgroundColor = "#b0bbc0";
      await sleep(500 / speed);
    } else {
      bars[j].style.backgroundColor = "#b0bbc0";
      await sleep(250 / speed);
    }

    j++; // always increment j
  }

  // on last iteration of above loop, pivot is swapped with whatever at i. So, new pivot index is i
  bars[i].style.backgroundColor = "lightgreen";
  await sleep(250 / speed);
  await quick_sort(array, l, i - 1);
  await quick_sort(array, i + 1, r);
}

/** Test to ensure merge sort logic works */
function quick_test() {
  let array = [100, 5, 35, 2, 3, 4, 74, 19, 509, 4329, 5, 3];
  console.log(array);
  quick_sort(array, 0, array.length - 1);

  console.log(array);
}
