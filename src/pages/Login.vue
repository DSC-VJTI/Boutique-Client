<template>
    <div class="p-5 text-center">
        <h1 class="blue mb-10">Admin Login</h1>
        <div>
            <form @submit.prevent="login">
                <div class="form-group-blue">
                    <input class="form-control-blue" type="text" placeholder="Username" v-model.trim="username" required>
                    <div>{{ usernameError }}</div>
                </div>
                <div class="form-group-blue">
                    <input class="form-control-blue" type="password" v-model.trim="password" placeholder="Password" required>
                    <div>{{ passwordError }}</div>
                </div>
                <div class="form-group-blue">
                    <input type="checkbox" class="outline-none" v-model="rememberMe">
                    <span class="ml-3 text-blue-800">Remember Me</span>
                </div>
                <div class="form-group-blue">
                    <button class="mt-10">Sign In</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: '',
            emailError: '',
            passwordError: '',
            isValid: true,
            rememberMe: false,
        }
    },
    methods: {
        resetInputs(){
            this.username = '';
            this.password = '';
        },
        resetErrors(){
            this.usernameError = '';
            this.passwordError = '';
        },
        async login(){
            
            if(!this.isValid)
                return;
            
            const status = await this.$store.dispatch('user/login', {
                body: {
                    username: this.username,
                    password: this.password 
                }
            });
            if(status === 200){
                
                // console.log("server response status 200!!")

                this.resetInputs();
                this.resetErrors();

                if(this.rememberMe)
                    localStorage.setItem('rememberMe',true);

                this.$router.replace('/admin');
            }else if(status === 422){
                this.passwordError = "Validation Error";
            }else{
                alert("Something went Wrong");
            }
            this.isLoading = false;
        },
    },
    created(){
        if(localStorage.getItem('rememberMe')){
            this.$store.commit('user/setAuth',{
                isAuthenticated: true
            })
            this.$router.replace('/admin');
            // alert('Admin authenticated');
        }
    }
}
</script>

<style>
</style>