<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const rememberMe = ref(true)

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

  authStore.login(email.value, password.value)
  router.push('/movies')
}

function quickGuestLogin() {
  authStore.login('guest@netflix.com')
  router.push('/movies')
}

function goToHome() {
  router.push('/')
}
</script>

<template>
  <div class="signin-page">
    <header class="signin-header">
      <div class="logo" @click="goToHome">NETFLIX</div>
    </header>

    <main class="signin-body">
      <div class="signin-box">
        <h1>Sign In</h1>

        <form @submit.prevent="login">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="Email or mobile number" required />
          </div>

          <div class="input-group">
            <input v-model="password" type="password" placeholder="Password" required />
          </div>

          <p v-if="error" class="error-msg">
            {{ error }}
          </p>

          <button type="submit" class="signin-btn">Sign In</button>

          <button type="button" class="guest-btn" @click="quickGuestLogin">
            Quick Guest Demo
          </button>

          <div class="options">
            <label class="remember">
              <input v-model="rememberMe" type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="#" class="help-link">Need help?</a>
          </div>
        </form>

        <div class="signup-prompt">
          <span>New to Netflix?</span>
          <a href="#" @click.prevent="quickGuestLogin">Sign up now.</a>
        </div>

        <p class="recaptcha-notice">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.signin-page {
  min-height: 100vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
}

.signin-header {
  padding: 24px 48px;
}

.logo {
  color: #e50914;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
}

.signin-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.signin-box {
  background: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  width: 100%;
  max-width: 440px;
  padding: 50px 58px;
  color: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8);
}

.signin-box h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group input {
  width: 100%;
  height: 50px;
  background: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: #fff;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
}

.input-group input:focus {
  border-color: #fff;
}

.error-msg {
  color: #e50914;
  font-size: 13px;
  margin-bottom: 16px;
}

.signin-btn {
  width: 100%;
  height: 48px;
  background: #e50914;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s;
}

.signin-btn:hover {
  background: #c11119;
}

.guest-btn {
  width: 100%;
  height: 42px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: background-color 0.2s;
}

.guest-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: #b3b3b3;
}

.remember {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.help-link {
  color: #b3b3b3;
  text-decoration: none;
}

.help-link:hover {
  text-decoration: underline;
}

.signup-prompt {
  margin-top: 36px;
  font-size: 15px;
  color: #737373;
}

.signup-prompt a {
  color: #fff;
  margin-left: 6px;
  text-decoration: none;
}

.signup-prompt a:hover {
  text-decoration: underline;
}

.recaptcha-notice {
  margin-top: 18px;
  font-size: 12px;
  color: #8c8c8c;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .signin-header {
    padding: 16px 20px;
  }
  .signin-box {
    padding: 30px 24px;
  }
}
</style>
