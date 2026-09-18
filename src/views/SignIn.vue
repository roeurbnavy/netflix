<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  if (!email.value.includes('@')) {
    error.value = 'Please enter a valid email address.'
    return
  }

  const savedUser = JSON.parse(localStorage.getItem('user'))

  if (!savedUser) {
    error.value = 'No account found. Please sign up first.'
    return
  }

  if (email.value !== savedUser.email || password.value !== savedUser.password) {
    error.value = 'Incorrect email or password.'
    return
  }

  localStorage.setItem('isLoggedIn', 'true')
  router.push('/movies')
}

function signUp() {
  router.push('/signup')
}
</script>

<template>
  <div class="signin-page">
    <div class="signin-box">
      <h1>Sign In</h1>

      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email or mobile number" />

        <input v-model="password" type="password" placeholder="Password" />

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <button type="submit" class="signin-btn">Sign In</button>

        <div class="options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#">Need help?</a>
        </div>
      </form>

      <div class="signup">
        <span>New to Netflix?</span>
        <button @click="signUp">Sign up now.</button>
      </div>
    </div>
  </div>
</template>
