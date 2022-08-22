import Worker from "worker-loader!./worker";
import * as Comlink from "comlink";

let workersList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: Comlink.wrap(new Worker()),
    inUse: false,
    number: i,
    taskAssigned: 0,
  };
  workersList.push(newWorker);
}

var takeRandomWorker = () => {
  return workersList[Math.floor(Math.random() * workersList.length)];
};

//-----Bubble Sort-----

const checkAvailabilityForBubbleSort = async (numbers) => {
  const worker = takeRandomWorker();
  console.log("Worker used for bubble sort is: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    const bubbleResponse = await worker.worker.sortingWithBubbles(numbers);
    worker.inUse = false;
    return bubbleResponse;
  }
};

const doBubbleSort = (numbers) => checkAvailabilityForBubbleSort(numbers);

//-----Merge Sort-----

const checkAvailabilityForMergeSort = async (numbers) => {
  let worker = takeRandomWorker();
  while (worker.inUse) {
    worker = takeRandomWorker();
  }
  console.log("Worker used for merge sort: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    const mergeResponse = await worker.worker.sortingWithMerge(numbers);
    worker.inUse = false;
    return mergeResponse;
  }
};

const doMergeSort = (numbers) => checkAvailabilityForMergeSort(numbers);

//-----Quick Sort-----

const checkAvailabilityForQuickSort = async (numbers) => {
  let worker = takeRandomWorker();
  while (worker.inUse) {
    worker = takeRandomWorker();
  }
  console.log("Worker used for quick sort : ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    const quickResponse = await worker.worker.sortingWithQuick(numbers);
    worker.inUse = false;
    return quickResponse;
  }
};

const doQuickSort = (numbers) => checkAvailabilityForQuickSort(numbers);

//-----Heap Sort-----

const checkAvailabilityForHeapSort = async (numbers) => {
  let worker = takeRandomWorker();
  while (worker.inUse) {
    worker = takeRandomWorker();
  }
  console.log("Worker used for heap sort: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    const heapResponse = await worker.worker.sortingWithHeap(numbers);
    worker.inUse = false;
    return heapResponse;
  }
};

const doHeapSort = (numbers) => checkAvailabilityForHeapSort(numbers);

const freeWorkers = () => {
  workersList.forEach((element) => {
    element.worker.terminate();
  });
};

export { doBubbleSort, doMergeSort, doQuickSort, doHeapSort, freeWorkers };
