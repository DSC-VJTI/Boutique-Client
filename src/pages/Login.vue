<template>
    <div class="p-5 text-center">
        <h1 class="blue mb-10">Admin Login</h1>
        <div>
            <form action="">
                <div class="form-group-blue">
                    <input class="form-control-blue" type="text" placeholder="Username" v-model.trim="username" required>
                </div>
                <div class="form-group-blue">
                    <input class="form-control-blue" type="password" v-model.trim="password" placeholder="Password" required>
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
            rememberMe: false,
        }
    }
}
</script>

<style>
</style>