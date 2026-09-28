<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const rememberMe = ref(true)

function handleSubmit() {
  error.value = ''
  const trimmedEmail = email.value.trim()

  if (!trimmedEmail) {
    error.value = 'Email or phone number is required.'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(trimmedEmail) && !/^\d{8,15}$/.test(trimmedEmail)) {
    error.value = 'Please enter a valid email or phone number.'
    return
  }

  authStore.login(trimmedEmail, password.value)
  email.value = ''
  password.value = ''
}

function close() {
  authStore.closeAuthModal()
  error.value = ''
}
</script>

<template>
  <Transition name="fade">
    <div v-if="authStore.isAuthModalOpen" class="modal-overlay" @click.self="close">
      <div class="modal-card">
        <button class="close-btn" @click="close">&times;</button>

        <div class="modal-logo">NETFLIX</div>

        <form class="modal-form" @submit.prevent="handleSubmit">
          <h2>Sign In</h2>

          <div class="form-group">
            <input
              v-model="email"
              type="text"
              placeholder="Email or mobile number"
              :class="{ 'has-error': error }"
            />
          </div>

          <div class="form-group">
            <input
              v-model="password"
              type="password"
              placeholder="Password (optional for quick login)"
            />
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <button type="submit" class="submit-btn">Sign In</button>

          <div class="extra-options">
            <label class="remember">
              <input v-model="rememberMe" type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" class="need-help">Need help?</a>
          </div>

          <div class="new-user">
            <span>New to Netflix?</span>
            <a href="#" @click.prevent="handleSubmit">Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
  padding: 16px;
}

.modal-card {
  position: relative;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #333;
  border-radius: 12px;
  width: 100%;
  max-width: 440px;
  padding: 40px 48px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 18px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #fff;
}

.modal-logo {
  color: #e50914;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.modal-form h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group input {
  width: 100%;
  height: 52px;
  background: #333;
  border: 1px solid #444;
  border-radius: 6px;
  color: #fff;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #e50914;
}

.form-group input.has-error {
  border-color: #e50914;
}

.error-msg {
  color: #e50914;
  font-size: 13px;
  margin-bottom: 14px;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background: #e50914;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #c11119;
}

.extra-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: #aaa;
}

.extra-options .remember {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.extra-options .need-help {
  color: #aaa;
  text-decoration: none;
}

.extra-options .need-help:hover {
  text-decoration: underline;
}

.new-user {
  margin-top: 28px;
  font-size: 14px;
  color: #888;
}

.new-user a {
  color: #fff;
  margin-left: 6px;
  text-decoration: none;
  font-weight: 600;
}

.new-user a:hover {
  text-decoration: underline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .modal-card {
    padding: 30px 24px;
  }
}
</style>
