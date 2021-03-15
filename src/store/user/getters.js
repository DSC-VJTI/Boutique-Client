export default {
    getAccessToken(state){
        return state.user.access_token;
    },
    isAuthenticated(state){
        return state.user.isAuthenticated;
    }
}