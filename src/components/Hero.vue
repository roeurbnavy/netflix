<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const emailError = ref('')

function handleGetStarted() {
  emailError.value = ''
  const trimmed = email.value.trim()

  if (!trimmed) {
    emailError.value = 'Email is required to get started.'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(trimmed)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  authStore.login(trimmed)
  email.value = ''
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-backdrop"></div>
    <div class="hero-content">
      <h1 class="hero-title">Unlimited movies, TV shows, and more</h1>
      <p class="hero-subtitle">
        Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or
        anywhere in-between.
      </p>
      <p class="hero-desc">Ready to watch? Enter your email to create or restart your membership.</p>

      <form class="hero-cta-form" @submit.prevent="handleGetStarted">
        <div class="input-wrapper">
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            :class="{ 'has-error': emailError }"
          />
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>
        <button type="submit" class="cta-button">
          Get Started
          <svg class="chevron-icon" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
            />
          </svg>
        </button>
      </form>

      <p class="hero-pricing">Endless entertainment starting at USD 2.99 / month.</p>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 60px;
  background-image:
    linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0.4) 60%, rgba(20, 20, 20, 0.8) 100%),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  border-bottom: 8px solid #222;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 20px;
  color: #e5e5e5;
  line-height: 1.5;
}

.hero-desc {
  font-size: 1.1rem;
  margin-bottom: 24px;
  color: #fff;
}

.hero-cta-form {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-wrapper input {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  font-size: 16px;
  background: rgba(15, 15, 15, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  color: #fff;
  outline: none;
  backdrop-filter: blur(4px);
  transition: border-color 0.2s;
}

.input-wrapper input:focus {
  border-color: #fff;
}

.input-wrapper input.has-error {
  border-color: #e50914;
}

.error-text {
  color: #e50914;
  font-size: 13px;
  margin-top: 6px;
  font-weight: 500;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 24px;
  background: #e50914;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s, transform 0.1s;
}

.cta-button:hover {
  background: #c11119;
}

.cta-button:active {
  transform: scale(0.98);
}

.chevron-icon {
  margin-left: 6px;
}

.hero-pricing {
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: 100px 16px 40px;
  }

  .hero-title {
    font-size: 2.1rem;
  }

  .hero-subtitle {
    font-size: 1.05rem;
  }

  .hero-cta-form {
    flex-direction: column;
    width: 100%;
  }

  .input-wrapper {
    width: 100%;
  }

  .cta-button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
