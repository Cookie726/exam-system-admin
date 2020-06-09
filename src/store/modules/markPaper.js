import {
    markExam
} from "@/api/markExam"

export default {
    namespaced: true,
    state: {
        scoreList: [],
        paperId: null,
        userId: null
    },
    mutations: {
        INIT(state, {
            paperId,
            userId,
            questionIdList
        }) {
            state.paperId = paperId
            state.userId = userId
            state.scoreList = questionIdList.map(id => {
                return {
                    questionId: id,
                    score: 0,
                    tag: 0
                }
            })
        },
        SET_SCORE(state, {
            score,
            questionId,
            tag
        }) {
            state.scoreList.forEach(item => {
                if (item.questionId === questionId) {
                    item.score = score
                    item.tag = tag
                    return;
                }
            })
        }
    },
    actions: {
        SUBMIT({
            state
        }) {
            return new Promise((resolve, reject) => {
                console.log(state)
                if (!state.userId || !state.paperId) {
                    reject("试卷或用户信息不完整")
                }
                markExam(state).then(res => {
                    resolve(res)
                })
            })
        }
    }
}