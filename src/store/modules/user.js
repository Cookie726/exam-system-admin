export default {
    namespaced: true,
    state: {
        get user() {
            return JSON.parse(localStorage.getItem('user'))
        },
        set user(userInfo) {
            localStorage.setItem('user', JSON.stringify(userInfo))
        }
    },
    mutations: {
        SIGNIN(state, userInfo) {
            state.user = userInfo
        }
    }
}