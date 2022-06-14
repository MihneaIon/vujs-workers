const state = {
    workers: [],
    selectedWorker: [],
    startComputation: false,
};


const getters = {
    workers: (state) => state.workers,
    selectedWorker: (state) => state.selectedWorker,
    getStartComputation: (state) => state.startComputation,
}

const mutations = {
    setWorkers(state, result){
        state.workers = result
    },

    setStartComutation(state, result){
        state.startComputation = result
    }
}

const actions = {
    
}


export default {
    state,
    getters,
    actions,
    mutations,
};
