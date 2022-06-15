function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}

// An optimized version of Bubble Sort
function bubbleSort(arr, n) {
  var i, j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

const bubbleSortMethod = (numbers) => {
  // Driver program to test above functions
  var arr = Array(10000)
    .fill()
    .map(() => Math.round(Math.random() * 10000)); //[64, 34, 25, 12, 22, 11, 90];

  var n = arr.length;

  const startTime = new Date();
  bubbleSort(arr, n);
  const endTime = new Date();
  const object = {
    start: startTime,
    end: endTime,
    difference: Math.abs(endTime - startTime) / 1000,
    done: true,
  };
  return object;
};

module.exports = bubbleSortMethod;
