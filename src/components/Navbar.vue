<script setup>
import { ref } from 'vue'
const email = ref('')
const emailError = ref('')
const showLoginModal = ref(false)
const loginIdentifier = ref('')
const isHelpOpen = ref(false)
const emit = defineEmits(['open-login'])
const joinNow = () => {
  emailError.value = ''
  if (email.value.trim() === '') {
    emailError.value = 'Email is required.'
    return
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }
  alert(`Welcome! Your email is ${email.value}`)
  email.value = ''
}
const openModal = () => {
  showLoginModal.value = true
  emit('open-login')
}
const closeModal = () => {
  showLoginModal.value = false
  loginIdentifier.value = ''
  isHelpOpen.value = false
}
const handleModalSubmit = () => {
  const value = loginIdentifier.value.trim()
  if (!value) {
    return
  }
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', value)
  alert(`Signed in as: ${value}`)
  closeModal()
}
</script>

<template>
  <header class="header">
    <div class="navbar">
      <div class="logo">NETFLIX</div>

      <button class="sign-in" @click="openModal">Sign In</button>
    </div>
    <div class="photo">
      <div class="hero-content">
        <h2>Movies</h2>

        <p class="description">
          Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or
          anywhere in-between. So many titles, much to experience.
        </p>
        <div class="input-area">
          <div class="email-box">
            <input
              v-model="email"
              type="email"
              placeholder="Email address"
              :class="{ 'input-error': emailError }"
              @input="emailError = ''"
            />
            <p v-if="emailError" class="error-message">
              <span class="error-icon">!</span>
              {{ emailError }}
            </p>
          </div>
          <button @click="joinNow">Join Now</button>
        </div>
        <p class="price">Endless entertainment starting at USD 2.99</p>
      </div>
    </div>
  </header>
  <Transition name="fade">
    <div v-if="showLoginModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <button class="close-btn" @click="closeModal">&times;</button>

        <div class="modal-logo">NETFLIX</div>

        <h1 class="modal-title">Enter your info to sign in</h1>

        <p class="modal-subtitle">Or get started with a new account.</p>

        <form class="modal-form" @submit.prevent="handleModalSubmit">
          <input
            v-model="loginIdentifier"
            type="text"
            placeholder="Email or mobile number"
            class="modal-input"
            required
          />

          <button type="submit" class="modal-submit-btn">Continue</button>
        </form>

        <div class="get-help">
          <button class="help-btn" @click="isHelpOpen = !isHelpOpen">
            Get Help
            <span class="chevron" :class="{ 'chevron-up': isHelpOpen }"> ❯ </span>
          </button>

          <div v-if="isHelpOpen" class="help-dropdown">
            <a href="#"> Forgot email or password? </a>
          </div>
        </div>

        <p class="recaptcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.header {
  width: 100%;
  position: relative;
  z-index: 1000;
}

.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
}

.logo {
  color: orangered;
  font-size: 50px;
  font-weight: bold;
  padding: 20px 0;
}

.sign-in {
  background-color: whitesmoke;
  color: black;
  border: none;
  border-radius: 15px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 30px;
}

.sign-in:hover {
  color: blue;
}

.photo {
  min-height: calc(100vh - 150px);
  margin: 0 40px;
  background-image:
    linear-gradient(to top, black, transparent),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  border: 1px solid gray;
  display: flex;
  align-items: flex-end;
  padding: 45px;
}

.hero-content {
  color: white;
  max-width: 900px;
}

.hero-content h2 {
  font-size: 50px;
  margin-bottom: 10px;
}

.description {
  font-size: 20px;
  line-height: 1.5;
}

.input-area {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 25px;
}

.email-box {
  width: 250px;
}

.input-area input {
  width: 250px;
  height: 40px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid orangered;
  background-color: black;
  color: white;
  outline: none;
}

.input-area input:focus {
  border-color: white;
}

.input-area input.input-error {
  border: 2px solid orangered;
}

.input-area button {
  width: 150px;
  height: 40px;
  background: orangered;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.input-area button:hover {
  opacity: 0.9;
}

.error-message {
  color: orangered;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-icon {
  width: 16px;
  height: 16px;
  border: 1px solid orangered;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

.price {
  margin-top: 12px;
  font-size: 17px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background-color: black;
  border-radius: 12px;
  padding: 40px 36px;
  box-shadow: 0 20px 40px black;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: gray;
  font-size: 28px;
  cursor: pointer;
}

.close-btn:hover {
  color: white;
}

.modal-logo {
  color: orangered;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 26px;
  color: white;
  margin-bottom: 6px;
}

.modal-subtitle {
  font-size: 14px;
  color: gray;
  margin-bottom: 24px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-input {
  width: 100%;
  height: 54px;
  background-color: black;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 0 16px;
  color: white;
  font-size: 15px;
  outline: none;
}

.modal-input:focus {
  border-color: white;
}

.modal-input::placeholder {
  color: gray;
}

.modal-submit-btn {
  width: 100%;
  height: 48px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.get-help {
  margin-top: 20px;
}

.help-btn {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
}

.chevron {
  font-size: 11px;
  transform: rotate(90deg);
  display: inline-block;
  transition: transform 0.2s ease;
}

.chevron-up {
  transform: rotate(-90deg);
}

.help-dropdown {
  margin-top: 10px;
}

.help-dropdown a {
  color: mediumblue;
  font-size: 13px;
  text-decoration: none;
}

.help-dropdown a:hover {
  text-decoration: underline;
}

.recaptcha-text {
  margin-top: 28px;
  font-size: 12px;
  color: gray;
  line-height: 1.4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
  }

  .logo {
    font-size: 35px;
  }

  .sign-in {
    margin-right: 0;
  }

  .photo {
    margin: 0 15px;
    padding: 25px;
  }

  .hero-content h2 {
    font-size: 35px;
  }

  .description {
    font-size: 16px;
  }

  .input-area {
    flex-direction: column;
  }

  .email-box {
    width: 100%;
  }

  .input-area input {
    width: 100%;
  }

  .input-area button {
    width: 130px;
  }
}
</style>
