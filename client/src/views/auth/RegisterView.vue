<script setup lang="ts">
import { useAuthStore, type RegisterData } from '@/stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: ""
})

const errorMessage = ref<String>("")

async function submit() {
    await authStore.register(registerData)
        .then(res => {
            router.replace({ name: 'login' })
        })
        .catch(err => {
            errorMessage.value = err.message
        })
}

</script>

<template>
    <div id="register">
        <div class="container">
            <div class="card card-body mt-4">
                <h5 class="card-title">Register</h5>
                <form @submit.prevent="submit">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="registerData.username" type="text" class="form-control" id="username"
                            aria-describedby="usernameHelp" autocomplete="username">
                        <div id="usernameHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input v-model="registerData.email" type="email" class="form-control" id="email"
                            aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div class="mb-3">
                        <label for="first_name" class="form-label">First Name</label>
                        <input v-model="registerData.first_name" type="text" class="form-control" id="first_name"
                            aria-describedby="first_nameHelp">
                        <div id="first_nameHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div class="mb-3">
                        <label for="last_name" class="form-label">Last Name</label>
                        <input v-model="registerData.last_name" type="text" class="form-control" id="last_name"
                            aria-describedby="last_nameHelp">
                        <div id="last_nameHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="registerData.password" type="password" class="form-control" id="password"
                            autocomplete="current-password">
                    </div>

                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">Confirm Password</label>
                        <input v-model="registerData.password_confirm" type="password" class="form-control"
                            id="password_confirm" autocomplete="new-passowrd">
                    </div>

                    <button type="submit" class="btn btn-outline-success">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
#register .card {
    max-width: 40vw;
    margin: auto;
}</style>