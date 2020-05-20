export default {
    namespaced: true,
    state: {
        title: "1",
        startTime: "2020-05-06 02:02:02",
        endTime: "2020/05/25",
        timeLimit: "4",
        classify: "5",
        paperScore: 40,
        user: {
            userName: "潘炳名"
        }
    },
    mutations: {
        SET_TITLE(state, title) {
            state.title = title
        },
        SET_STARTTIME(state, startTime) {
            state.startTime = startTime
        },
        SET_ENDTIME(state, endTime) {
            state.endTime = endTime
        },
        SET_TIMELIMIT(state, timeLimit) {
            state.timeLimit = timeLimit
        },
        SET_CLASSIFY(state, classify) {
            state.classify = classify
        },
        SET_PAPERSCORE(state, paperScore) {
            state.paperScore = paperScore
        }
    }
}