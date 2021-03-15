export default {
    setUser(state,payload){
        state.user.access_token = payload.access_token
    },
    setAuth(state,payload){
        state.user.isAuthenticated = payload.isAuthenticated;
    }
}