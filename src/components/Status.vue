<template>
  <div class="text-center">
    <div>
      <v-row class="custom-row mx-auto" align="center" justify="space-around">
        <v-card class="mx-auto" outlined>
          <v-card-title> Buuble Sort </v-card-title>
          <Bubble
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @buubleResult="bubbleComputationDone"
          ></Bubble>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Merge Sort </v-card-title>
          <Merge
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @mergeResult="mergeComputationDone"
          ></Merge>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Quick Sort </v-card-title>
          <Quick
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @quickResult="quickComputationDone"
          ></Quick>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Heap Sort </v-card-title>
          <Heap
            :numbers="this.arrayOfRandomNumbers"
            v-if="getStartComputation"
            @heapResult="heapComputationDone"
          ></Heap>
        </v-card>
        <!-- <div v-if="ready">Test</div> -->
      </v-row>
    </div>

    <button class="title" @click="start()">send message</button>
    <button class="title" @click="generateNewArray()">refresh message</button>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { freeWorkers } from "../util/worker-api";

export default {
  components: {
    Bubble: () => import("./SortingMethods/Bubble.vue"),
    Merge: () => import("./SortingMethods/Merge.vue"),
    Quick: () => import("./SortingMethods/Quick.vue"),
    Heap: () => import("./SortingMethods/Heap.vue"),
  },

  data() {
    return {
      arrayOfRandomNumbers: [],
      startorting: false,
      time: new Date(),
      bubbleIsDone: false,
      mergeIsDone: false,
      quickIsDone: false,
      heapIsDone: false,
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters(["getStartComputation", "getArrayDimension"]),
    ready() {
      // if (
      //   this.bubbleIsDone &&
      //   this.mergeIsDone &&
      //   this.quickIsDone &&
      //   this.heapIsDone
      // ){
      //   freeWorkers();
      // }
    },
  },
  watch: {},
  mounted() {
    setInterval(() => {
      this.time = new Date();
    }, 300);
  },
  methods: {
    ...mapMutations(["setStartComutation", "setArrayDimension"]),
    start() {
      const newArray = Array(1000000)
        .fill()
        .map(() => Math.round(Math.random() * 1000000));
      this.arrayOfRandomNumbers = [...newArray];
      this.setStartComutation(true);
      this.startorting = true;
      console.log(this.startorting);
    },
    recalculate() {
      this.keyQuick++;
      this.keyBubble++;
      this.keyMerge++;
      this.keyHeap++;
    },
    generateNewArray() {
      const newArray = Array(1000000)
        .fill()
        .map(() => Math.round(Math.random() * 1000000));
      this.arrayOfRandomNumbers = [...newArray];
      console.log("After", this.arrayOfRandomNumbers);
    },
    bubbleComputationDone(value) {
      this.bubbleIsDone = value;
    },
    mergeComputationDone(value) {
      this.mergeIsDone = value;
    },
    quickComputationDone(value) {
      this.quickIsDone = value;
    },
    heapComputationDone(value) {
      this.heapIsDone = value;
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.custom-row {
  margin: 5% !important;
}
.custom-button {
  margin: 5% !important;
}
.title {
  margin: 2%;
  border: thin solid #00bfaf;
  border-radius: 20%;
}
</style>
