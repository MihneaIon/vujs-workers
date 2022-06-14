import Worker from "worker-loader!./worker";
import * as Comlink from "comlink";

let workersList = [];
let mySet1 = new Set();

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: Comlink.wrap(new Worker()),
    inUse: false,
    number: i,
    taskAssigned: 0
  };
  workersList.push(newWorker);
}

var takeRandomWorker = () => {
  return workersList[Math.floor(Math.random() * workersList.length)];
};

//-----Bubble Sort-----

const checkAvailabilityForBubbleSort = () => {
  const worker = takeRandomWorker();
  mySet1.add(worker);
  //   numberArray.add(worker)
  console.log("Worker used: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    return worker.worker.sortingWithBubbles;
  }
};

const doBubbleSort = checkAvailabilityForBubbleSort();

//-----Merge Sort-----

const checkAvailabilityForMergeSort = () => {
  let worker = takeRandomWorker();
  while (worker.inUse){
    worker = takeRandomWorker();
  }
  console.log("Worker used: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    return worker.worker.sortingWithMerge;
  }
};

const doMergeSort = checkAvailabilityForMergeSort();

//-----Quick Sort-----

const checkAvailabilityForQuickSort = () => {
  let worker = takeRandomWorker();
  while (worker.inUse){
    worker = takeRandomWorker();
  }
  console.log("Worker used: ", worker.number);
  if (worker.inUse == false) {
    worker.inUse = true;
    return worker.worker.sortingWithQuick;
  }
};

const doQuickSort = checkAvailabilityForQuickSort();

//-----Heap Sort-----

const checkAvailabilityForHeapSort = () => {
  let worker = takeRandomWorker();
  while (worker.inUse){
    worker = takeRandomWorker();
  }
  console.log("Worker used: ", worker.number);
  if (worker.inUse == false ) {
    worker.inUse = true;
    return worker.worker.sortingWithHeap;
  }
};

const doHeapSort = checkAvailabilityForHeapSort();

export { doBubbleSort, doMergeSort, doQuickSort, doHeapSort };
