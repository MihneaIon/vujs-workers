const state = {
    startTimeBubbleSort: undefined,
    endTimeBubbleSort: undefined,
    startTimeMergeSort: undefined,
    endTimeMergeSort: undefined,
    startTimeQuickSort: undefined,
    endTimeQuickSort: undefined,
    startTimeHeapSort: undefined,
    endTimeHeapSort: undefined

};


const getters = {
    getStartTimeBubbleSort: (state) => state.startTimeBubbleSort,
    getEndTimeBubbleSort: (state) => state.endTimeBubbleSort,
    getStartTimeMergeSort: (state) => state.startTimeMergeSort,
    getEndTimeMergeSort: (state) => state.endTimeMergeSort,
    getStartTimeQuickSort: (state) => state.startTimeQuickSort,
    getEndTimeQuickSort: (state) => state.endTimeQuickSort,
    getStartTimeHeapSort: (state) => state.startTimeHeapSort,
    getEndTimeHeapSort: (state) => state.endTimeHeapSort
}

const mutations = {
    setStartTimeBubbleSort(state, result){
        state.startTimeBubbleSort = result
    },
    setEndTimeBubbleSort(state, result){
        state.endTimeBubbleSort = result
    },
    setStartTimeMergeSort(state, result){
        state.startTimeMergeSort = result
    },
    setEndTimeMergeSort(state, result){
        state.endTimeMergeSort = result
    },
    setStartTimeQuickSort(state, result){
        state.startTimeQuickSort = result
    },
    setEndTimeQuickSort(state, result){
        state.endTimeQuickSort = result
    },
    setStartTimeHeapSort(state, result){
        state.startTimeHeapSort = result
    },
    setEndTimeHeapSort(state, result){
        state.endTimeHeapSort = result
    },
}

const actions = {
    
}


export default {
    state,
    getters,
    actions,
    mutations,
};
