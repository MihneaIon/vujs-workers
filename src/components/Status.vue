<template>
  <div class="text-center">
    <div class="sorts-container">
      <v-row class="custom-row mx-auto" align="center" justify="space-around">
        <v-card class="mx-auto sort-card" outlined>
          <v-card-title> Buuble Sort </v-card-title>
          <Bubble
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @buubleResult="bubbleComputationDone"
          ></Bubble>
        </v-card>
        <v-card class="mx-auto sort-card" outlined>
          <v-card-title> Merge Sort </v-card-title>
          <Merge
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @mergeResult="mergeComputationDone"
          ></Merge>
        </v-card>
        <v-card class="mx-auto sort-card" outlined>
          <v-card-title> Quick Sort </v-card-title>
          <Quick
            :numbers="arrayOfRandomNumbers"
            v-if="getStartComputation"
            @quickResult="quickComputationDone"
          ></Quick>
        </v-card>
        <v-card class="mx-auto sort-card" outlined>
          <v-card-title> Heap Sort </v-card-title>
          <Heap
            :numbers="this.arrayOfRandomNumbers"
            v-if="getStartComputation"
            @heapResult="heapComputationDone"
          ></Heap>
        </v-card>
      </v-row>
    </div>
    <div v-if="ready"></div>
    <v-btn :disabled="!isValidPress" class="title" @click="start()">Start Computation</v-btn>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

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
      time: new Date(),
      bubbleIsDone: false,
      mergeIsDone: false,
      quickIsDone: false,
      heapIsDone: false,
      isValidPress: true,

    };
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters(["getStartComputation", "getArrayDimension"]),
    ready() {
      if (
        this.bubbleIsDone &&
        this.mergeIsDone &&
        this.quickIsDone &&
        this.heapIsDone
      ){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isValidPress = true;
        return true
      }
      return false
    },
  },
  watch: {
  },
  mounted() {
    setInterval(() => {
      this.time = new Date();
    }, 300);
  },
  methods: {
    ...mapMutations(["setStartComutation", "setArrayDimension"]),
    start() {
      if (this.getStartComputation){
        this.resetInitialForm();
      }
      this.isComputation = true;
      const newArray = Array(1000000)
        .fill()
        .map(() => Math.round(Math.random() * 1000000));
      this.arrayOfRandomNumbers = [...newArray];
      this.setStartComutation(true);
      this.isValidPress = false
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
    resetInitialForm(){
      this.bubbleIsDone = false;
      this.mergeIsDone = false;
      this.quickIsDone = false;
      this.heapIsDone = false;
      this.isValidPress = false;
    }
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.custom-row {
  margin: 2% !important;
}
.custom-button {
  margin: 5% !important;
}
.title {
  margin: 2%;
  border: thin solid #00bfaf;
  border-radius: 20%;
}
.sorts-container{
display: flex;
justify-content: center;
padding: 5px 0;
}
.sort-card{
  margin: 1%;
}
</style>
