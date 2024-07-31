import { createStore } from 'vuex'
import getters from './getters'
import common from './modules/common.js'

const store = createStore({
    modules: {
        common,
        screen,
    },
    getters
})

export default store
