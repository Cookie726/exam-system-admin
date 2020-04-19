export default {
    namespaced: true,
    state: {
        flag: [],
        done: []
    },
    mutations: {
        INIT_FLAG(state, length) {
            state.flag = new Array(length).fill(false)
        },
        SET_MARK(state, {
            index,
            status
        }) {
            const arr = JSON.parse(JSON.stringify(state.flag))
            arr[index] = status
            state.flag = arr
        },
        INIT_DONE(state, length) {
            state.done = new Array(length).fill(false)
        },
        SET_DONE(state, {
            index,
            status
        }) {
            const arr = JSON.parse(JSON.stringify(state.done))
            arr[index] = status
            state.done = arr
        }
    }
}