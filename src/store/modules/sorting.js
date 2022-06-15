const state = {
  workers: [],
  selectedWorker: [],
  arrayDimension: 0,
  startComputation: false,
};

const getters = {
  workers: (state) => state.workers,
  selectedWorker: (state) => state.selectedWorker,
  getStartComputation: (state) => state.startComputation,
  getArrayDimension: (state) => state.arrayDimension,
};

const mutations = {
  setWorkers(state, result) {
    state.workers = result;
  },

  setStartComutation(state, result) {
    state.startComputation = result;
  },

  setArrayDimension(state, result) {
    state.arrayDimension = result;
  },
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
