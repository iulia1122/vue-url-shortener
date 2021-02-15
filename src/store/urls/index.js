export default {
    namespaced: true,

    state() {
        return {
            urls: []
        }
    },

    actions: {
       
    },

    mutations: {
        updateUrlList(state, url) {
            state.urls = [...state.urls, url]
        },
        setUrlList(state, urls) {
            state.urls = urls
        },
    },

    getters: {
        getUrlList(state) {
            return state.urls
        },
    }
}