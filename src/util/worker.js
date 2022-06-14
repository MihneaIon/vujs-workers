import * as Comlink from "comlink";
import bubbleSort from "@/math/bubbleSort";
import mergeSort from "@/math/mergeSort";
import quickSort from "@/math/quickSort";
import heapSort from "@/math/heapSort"

const sum = {
  toUpperCase(msg) {
    return msg.toUpperCase();
  },
  doHardWork() {
    let i = 0;
    while (i < 9000000000) {
      i++;
    }
    return i;
  },
  calculateDistanceToOhio() {},
};

const sortMethods = {
  sortingWithBubbles() {
    console.log("Bubble Sort is starting")
    bubbleSort();
    return true
  },
  sortingWithMerge() {
    console.log("Merge Sort is starting")
    mergeSort();
    return true
  },
  sortingWithQuick() {
    console.log("Quick Sort is starting")
    quickSort();
    return true
  },
  sortingWithHeap(){
    console.log("Heap Sort is starting")
    heapSort();
    return true
  },
};

// Comlink.expose(sum);
Comlink.expose(sortMethods);
