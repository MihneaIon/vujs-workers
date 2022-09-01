<template>
  <div class="text-center">
    <div class="sorts-container text-center">
      <v-row class="custom-row mx-auto" align="center" justify="space-around">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="bubbleRange"
            type="number"
            :rules="[rules.required, rules.number]"
            label="Bubble Sort range"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Merge Sort range"
            placeholder="1000"
            type="number"
            :rules="[rules.required, rules.number]"
            v-model="mergeRange"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Quick Sort range"
            placeholder="1000"
            type="number"
            :rules="[rules.required, rules.number]"
            v-model="quickRange"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Heap Sort range"
            placeholder="1000"
            type="number"
            :rules="[rules.required, rules.number]"
            v-model="heapRenge"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto sort-card" outlined>
            <v-card-title> Buuble Sort </v-card-title>
            <Bubble
              :numbers="arrayOfRandomNumbers"
              :bubbleRange="bubbleRange"
              v-if="getStartComputation"
              @buubleResult="bubbleComputationDone"
            ></Bubble>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto sort-card" outlined>
            <v-card-title> Merge Sort </v-card-title>
            <Merge
              :numbers="arrayOfRandomNumbers"
              :mergeRange="mergeRange"
              v-if="getStartComputation"
              @mergeResult="mergeComputationDone"
            ></Merge>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto sort-card" outlined>
            <v-card-title> Quick Sort </v-card-title>
            <Quick
              :numbers="arrayOfRandomNumbers"
              :quickRange="quickRange"
              v-if="getStartComputation"
              @quickResult="quickComputationDone"
            ></Quick>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto sort-card" outlined>
            <v-card-title> Heap Sort </v-card-title>
            <Heap
              :numbers="this.arrayOfRandomNumbers"
              :heapRange="heapRenge"
              v-if="getStartComputation"
              @heapResult="heapComputationDone"
            ></Heap>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="ready"></div>
    <v-btn :disabled="!isValidPress" class="title" @click="start()"
      >Start Computation</v-btn
    >
    <div class="time">
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
      bubbleRange: "1000",
      mergeRange: "1000",
      quickRange: "1000",
      heapRenge: "1000",
      arrayOfRandomNumbers: [],
      time: new Date(),
      bubbleIsDone: false,
      mergeIsDone: false,
      quickIsDone: false,
      heapIsDone: false,
      isValidPress: true,
      numberOfNumbers: 0,
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => {
          const patternNumber = /^[1-9]\d*$/;
          return patternNumber.test(value) || "Invalid input.";
        },
      },
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
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isValidPress = true;
        return true;
      }
      return false;
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
      if (this.getStartComputation) {
        this.resetInitialForm();
      }
      this.isComputation = true;
      const newArray = Array(1)
        .fill()
        .map(() => Math.round(Math.random() * 1));
      this.arrayOfRandomNumbers = [...newArray];
      this.setStartComutation(true);
      this.isValidPress = false;
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
    resetInitialForm() {
      this.bubbleIsDone = false;
      this.mergeIsDone = false;
      this.quickIsDone = false;
      this.heapIsDone = false;
      this.isValidPress = false;
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.custom-row {
  margin: 2rem !important;
}
.custom-button {
  margin: 5% !important;
}
.title {
  margin: 2%;
  border: thin solid #00bfaf;
  border-radius: 20%;
}
.sorts-container {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}
.sort-card {
  margin: 1%;
}
.time {
  margin: 5%;
}
</style>
