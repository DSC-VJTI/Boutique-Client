<template>
    <div class="p-5 text-center">
        <h1 class="blue mb-10">Admin Register</h1>
        <div>
            <form class="m-5" @submit.prevent="register">
                <div class="form-group-blue">
                    <input class="form-control-blue" type="text" placeholder="Full Name" v-model.trim="fullname" required>
                </div>
                <div class="form-group-blue">
                    <input class="form-control-blue" type="text" placeholder="Username" v-model.trim="username" required>
                </div>
                <div class="form-group-blue">
                    <input class="form-control-blue" type="password" placeholder="Password" v-model.trim="password" required>
                    <br><span class="text-red">{{ passwordError }}</span>
                </div>
                <div class="form-group-blue">
                    <button class="mt-10">Add Admin</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fullname: '',
            username: '',
            password: '',
            passwordError:'',
            isValid: true
        }
    },
    methods: {
        validate(){
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            // const passwordPattern = /[A-Za-z]/;

            if(!passwordPattern.test(this.password)){
                this.passwordError = '*Please enter a password with minimum eight characters, at least one letter, one number and one special character.';
                this.isValid = false;
            }
            else{
                this.passwordError = '';
                this.isValid = true;
            }
        },
        register(){
            this.validate();
            if(this.isValid){
                console.log("Full Name: ", this.fullname);
                console.log("Username: ", this.username);
                console.log("Password: ", this.password);
                this.fullname = '';
                this.username = '';
                this.password = '';
            }
        }
    }
}
</script>

<style>

</style>