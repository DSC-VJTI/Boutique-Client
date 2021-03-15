import getters from './getters';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state(){
        return {
            user:{
                access_token: ''
            },
            isAuthenticated: false
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}