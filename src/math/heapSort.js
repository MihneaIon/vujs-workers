function sort(arr) {
  var n = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);

  // One by one extract an element from heap
  for (var i = n - 1; i > 0; i--) {
    // Move current root to end
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}
const heapSortMethod = (numbers) => {
  const newArray = Array(1000000)
        .fill()
        .map(() => Math.round(Math.random() * 1000000));
  numbers = newArray;
  const startTime = new Date();
  sort(numbers);
  const endTime = new Date();
  const object = {
    start: startTime,
    end: endTime,
    difference: Math.abs(endTime - startTime) / 1000,
    done: true,
  };
  return object;
};

module.exports = heapSortMethod;
