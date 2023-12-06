import { sleep } from "./utility.js";
import { speed } from "../main.js";

/** Bubble Sort */
export default async function bubble_sort(array, l, r) {
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
        let temp = array[j];
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
}
