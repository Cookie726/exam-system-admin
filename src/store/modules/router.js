import {
    asyncRoute
} from "@/router"
import {
    getRoutes
} from "@/utils/helpers"
export default {
    namespaced: true,
    state: {
        dynamicRoutes: []
    },
    mutations: {
        SET_ROUTERS(state, routers) {
            state.dynamicRoutes = routers
        }
    },
    actions: {
        GenerateRoutes({
            commit
        }, role) {
            return new Promise(resolve => {
                const accessedRouters = getRoutes(role, asyncRoute)
                commit('SET_ROUTERS', accessedRouters);
                resolve()
            })
        }
    }
}