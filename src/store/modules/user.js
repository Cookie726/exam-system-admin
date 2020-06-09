import {
    logout
} from "@/api/sign";
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
        },
        LOGOUT(state) {
            state.user = null
        }
    },
    actions: {
        LOGOUT({
            commit
        }) {
            logout().then((res) => {
                if (res.code === 0) {
                    commit("LOGOUT")
                    window.location.reload();
                }
            })
        }
    }
}