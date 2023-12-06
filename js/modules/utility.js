/* basic in built sort method */
function basic_sort(array) {
  array.sort(function (a, b) {
    return a - b;
  });
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
