import axios from 'axios';

export default {

    async login(context,payload){
        
        const status = axios.post(
            context.rootGetters.getUrl + 'api/admin/login',
            payload.body,
            context.rootGetters.getConfig
        )
        .then((response) => {
            context.commit('setUser', response.data);
            context.commit('setAuth',{ isAuthenticated: true });
            localStorage.setItem('user',JSON.stringify(response.data));
            localStorage.setItem('isAuthenticated',context.getters.isAuthenticated);          
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });

        return status;
    },

    async register(context,payload){
        
        try{
            const response = await axios.post(
                context.rootGetters.getUrl + 'api/admin/register',
                payload.body,
                {
                    headers: {
                        ContentType: 'application/json',
                        Authorization: 'Bearer ' + payload.token,
                    }
                }
            );     
            return response.status;
        }
        catch(error){
            return error.response.status;
        }
    },

}