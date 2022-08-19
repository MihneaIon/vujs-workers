import * as Comlink from "comlink";
import bubbleSort from "@/math/bubbleSort";
import mergeSort from "@/math/mergeSort";
import quickSort from "@/math/quickSort";
import heapSort from "@/math/heapSort"

const sortMethods = {
  sortingWithBubbles(numbers) {
    console.log("Bubble Sort is starting")
    return bubbleSort(numbers);
  },
  sortingWithMerge(numbers) {
    console.log("Merge Sort is starting")
    return mergeSort(numbers);
    
  },
  sortingWithQuick(numbers) {
    console.log("Quick Sort is starting")
    return quickSort(numbers);
  },
  sortingWithHeap(numbers){
    console.log("Heap Sort is starting")
    return heapSort(numbers);
  },
};

Comlink.expose(sortMethods);
