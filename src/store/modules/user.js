import {
    logout,
    signin,
    getUserInfo
} from "@/api/sign";
export default {
    namespaced: true,
    state: {
        get user() {
            return JSON.parse(localStorage.getItem('user'))
        },
        set user(userInfo) {
            localStorage.setItem('user', JSON.stringify(userInfo))
        },
        roles: []
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
        },
        SIGNIN({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                signin(data).then(({
                    code,
                    msg,
                    data
                }) => {
                    if (code === 0) {
                        commit("SIGNIN", data)
                        resolve()
                    } else {
                        reject(msg)
                    }
                }).catch(e => {
                    reject(e)
                })
            })

        },
        GETUSERINFO({
            state
        }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(({
                    code,
                    msg,
                    data
                }) => {
                    if (code === 0) {
                        state.roles = data.roles
                        resolve(state.roles)
                    } else {
                        reject(msg)
                    }
                }).catch(e => {
                    reject(e)
                })
            })

        }
    }
}