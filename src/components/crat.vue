<template>
  <div class="page">
    <section class="plans">
      <h1>A Plan To Suit Your Needs</h1>

      <div class="plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="plan-card"
          :class="{ popular: plan.popular }"
          @click="openPlan(plan)"
        >
          <span v-if="plan.popular" class="popular-badge"> Most Popular </span>

          <h2>{{ plan.name }}</h2>

          <div class="quality">
            {{ plan.quality }}
          </div>

          <ul>
            <li v-for="feature in plan.features" :key="feature">
              <span class="check">~</span>
              {{ feature }}
            </li>
          </ul>

          <div class="plan-price">USD {{ plan.price }}<span>/mo</span></div>
        </div>
      </div>
    </section>

    <section class="discover">
      <h2>Discover your next favorites, plus new releases every week</h2>
      <button>
        <a href="https://www.netflix.com/kh/"><p>More About Netflix</p></a>
      </button>
    </section>

    <div class="tudum">
      <span>T</span>

      Read about Netflix TV shows and movies and watch bonus videos on

      <strong>
        <a href="https://www.netflix.com/tudum" target="_blank"> Tudum.com. </a>
      </strong>
    </div>

    <button class="scroll-join-btn" @click="openModal">Join now</button>
  </div>

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

  <footer class="footer">
    <div class="footer-content">
      <a href="https://help.netflix.com/en/contactus" target="_blank" class="contact">
        Questions? Contact us.
      </a>

      <div class="footer-links">
        <div>
          <a href="https://help.netflix.com/en/node/412" target="_blank"> FAQ </a>

          <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" target="_blank">
            Investor Relations
          </a>

          <a href="https://help.netflix.com/legal/privacy" target="_blank"> Privacy </a>

          <a href="https://fast.com/" target="_blank"> Speed Test </a>
        </div>

        <div>
          <a href="https://help.netflix.com/en" target="_blank"> Help Center </a>

          <a href="https://jobs.netflix.com/" target="_blank"> Jobs </a>

          <a href="https://www.netflix.com/kh/browse/genre/34399" target="_blank">
            Cookie Preferences
          </a>

          <a href="https://help.netflix.com/legal/notices" target="_blank"> Legal Notices </a>
        </div>

        <div>
          <a href="https://www.netflix.com/kh/login" target="_blank"> Account </a>

          <a href="https://help.netflix.com/en/node/14361" target="_blank"> Ways to Watch </a>

          <a href="https://help.netflix.com/en/node/134094" target="_blank">
            Corporate Information
          </a>

          <a href="https://www.netflix.com/kh/browse/genre/839338" target="_blank">
            Only on Netflix
          </a>
        </div>

        <div>
          <a href="https://media.netflix.com/en/" target="_blank"> Media Center </a>

          <a href="https://help.netflix.com/legal/termsofuse" target="_blank"> Terms of Use </a>

          <a href="https://help.netflix.com/en/contactus" target="_blank"> Contact Us </a>
        </div>
      </div>

      <div class="language-wrapper">
        <button class="language" @click="showLanguages = !showLanguages">
          {{ selectedLanguage }}
          <span>⌃</span>
        </button>

        <div v-if="showLanguages" class="language-menu">
          <button v-for="language in languages" :key="language" @click="changeLanguage(language)">
            {{ language }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
const email = ref('')
const emailError = ref('')
const showLoginModal = ref(false)
const loginIdentifier = ref('')
const isHelpOpen = ref(false)
const emit = defineEmits(['open-login'])
function joinNow() {
  emailError.value = ''

  const value = email.value.trim()

  if (!value) {
    emailError.value = 'Email is required.'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(value)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  alert(`Welcome! Your email is ${value}`)

  email.value = ''
}

function openModal() {
  showLoginModal.value = true
  emit('open-login')
}

function closeModal() {
  showLoginModal.value = false
  loginIdentifier.value = ''
  isHelpOpen.value = false
}

function handleModalSubmit() {
  const value = loginIdentifier.value.trim()

  if (!value) {
    return
  }

  alert(`Signing in with: ${value}`)

  closeModal()
}
function openPlan(plan) {
  if (plan.link) {
    window.open(plan.link, '_blank')
  }
}
const plans = [
  {
    name: 'Mobile',
    quality: '480p',
    price: '2.99',
    link: 'https://www.netflix.com/signup?serverState=BgjUv%2BvcAxLpAcwAREIc3lojukSAGm51kdPN%2BrusgqcjjP9G8lSNggxGFnKoBKSyyFq0ujfMMmf1QPEmg7V%2BxyCBXIhbIO7Te7PPVE9a0HClyThwcKOeKGQVrjYCjcMoxMNp5NwEEAlrQZruk%2BYtjXWBBHPpsTTh4Mx6bjzj9une%2BxrNbHd6uPhI6rUrr1ub6JnJBA7LIw4EZQa4tKequmgHfw9pQTWOpYkVB80Dh6t3S%2FAABvl61HIIVTyxDpHUTG94Lboa73XdhIM%2BDttlLAs%2FAf3Swrm4mndvSpW7m8HMbwg6ZGWOOmmkVN5qZdJHKMirGAYiDgoMYpfaKUM2Azj%2FrDfB',
    features: ['Fair video quality', 'For your phone or tablet'],
  },
  {
    name: 'Basic',
    quality: '720p',
    price: '3.99',
    link: 'https://www.netflix.com/signup?serverState=BgjUv%2BvcAxLpAXEC4FFMjiKXYyKVNzN2toxNAt2ehch3n1Y8nMFMZDlEovj3hX3TplgyEcAPmpXnQ1FJoUf3bRMSQ3esS%2BdiaTdbL6JOGreZeCkfWA6C6q32Fu8c7P%2BNazkU2PlaAENRhQJ0kZtiL4LJfYqih1V7McCglOeqaoYwJonG49g5rjvT7IOk5Vo9EQ38iudbBLsUMRCYCtMDmkY%2B0yeaakUQ1D6MtUrv5YEjZyjIRlSR4HlmOOXTB3tJdu2vAsdoDVvkZvxK6tcGcQ2FOLuSEUNqT%2BERkdc3ULEZlLtB4owqmMku6%2FrG3qKwNIAsGAYiDgoMyxKWHjvy9OS1ysYh',
    features: ['Good video quality', 'For your phone, tablet, laptop and TV'],
  },
  {
    name: 'Standard',
    quality: '1080p',
    price: '7.99',
    link: 'https://www.netflix.com/signup?serverState=BgjUv%2BvcAxLpAXvveSALQ0I%2B683rkkb4Yx2EKQ0nq3tVeJwEtoVPS%2BMmMjgCkmIvOK7s4SiGUT4sNbvJLHHcfUDwwkRnB2pOABChiwZddjiTB2EwUKZVswKVsZaDi7WXghE9RL5anwZpgaiaxBb36OyZc9qPuJgOCwRsA%2FpDLWGAsy%2BuUNvx373NpaR1lxcqR6Bu08Z3gUtQ4rF4hxWM5gDKVQmVEfpWumQj%2Bd8CIDC4Io5KM2MPOblOT4ah%2F3YJUHH%2Bo2%2FVEY3EhwUmMl78lxrA5M1ciWRYFsJjQu%2BSiIsdRChruRdPYIYcn%2Fu8bnzhUzAUGAYiDgoMrss%2FvViSzY5Q45D%2B',
    features: ['Great video quality', 'For your phone, tablet, laptop and TV'],
  },
  {
    name: 'Premium',
    quality: '4K + HDR',
    price: '9.99',
    popular: true,
    link: 'https://www.netflix.com/signup?serverState=BgjUv%2BvcAxLpAQ5KKNvwnFaS0PvJ3G7ejzg96LM3cer6B%2B3h2NKa6elMul5k3OccSFysRAl5ErZ5mkWYnEsCKNwOFOc5TXdm9YjSO4gbmMi3Q%2Fo3qwnka6tS2bo2LfvC5Efs2nAwcRE20hfGKvK8uTJR5ezgiAEX3KTwIYLRwBh2DR%2Bd1RYH%2FbnOcNLLnr83rxk91Nz%2FRGbCA%2B8fJw7zPDu%2FAqkO6gEgvO6L4WBN%2Fsa%2BBrHeK9%2Bus18ltBe38IWCV%2FHKuABj5ROtwQqb8PBJ2oJgsvNDoEhB%2FoVDnbtI5MhVx6BjPJMEVS7jCdThkifI2vFPGAYiDgoMZqaCYP9%2FbtCq18%2Bc',
    features: [
      'Best video quality',
      'Immersive sound (spatial audio)',
      'For your phone, tablet, laptop and TV',
    ],
  },
]

const selectedLanguage = ref('English')
const showLanguages = ref(false)
const languages = ['English', 'Khmer', '中文', '日本語', '한국어', 'Français']
function changeLanguage(language) {
  selectedLanguage.value = language
  showLanguages.value = false
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  padding: 50px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background: black;
}

.plans {
  max-width: 1150px;
  margin: auto;
}
.plans h1 {
  font-size: 28px;
  margin-bottom: 25px;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.plan-card {
  position: relative;
  min-height: 260px;
  padding: 20px 18px;
  border-radius: 12px;
  background: linear-gradient(175deg, red, black);
  border: 1px solid whitesmoke;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.plan-card h2 {
  margin: 0 0 5px;
  font-size: 19px;
}
.plan-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px black;
}

.quality {
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 12px;
}

.plan-card ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.plan-card li {
  display: flex;
  gap: 7px;
  margin: 7px 0;
  font-size: 15px;
  line-height: 1.3;
  color: white;
}

.check {
  color: white;
  font-weight: bold;
}

.plan-price {
  position: absolute;
  bottom: 18px;
  left: 18px;
  font-size: 17px;
  font-weight: bold;
}

.plan-price span {
  font-weight: normal;
}

.popular-badge {
  position: absolute;
  top: 10px;
  right: 8px;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  background: gray;
}

.discover {
  max-width: 1150px;
  min-height: 110px;
  margin: 28px auto 0;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.252), transparent),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg');
  background-size: cover;
  background-position: center;
}

.discover h2 {
  font-size: 18px;
}
.discover p {
  color: whitesmoke;
  font-size: 13px;
  text-decoration: underline;
  transition: color 0.2s;
}

.discover button {
  border: 0;
  border-radius: 20px;
  padding: 8px 14px;
  color: white;
  background: gray;
  cursor: pointer;
}

.tudum {
  max-width: 1150px;
  margin: 18px auto;
  padding: 28px;
  font-size: 12px;
  color: whitesmoke;
  background: rgba(128, 128, 128, 0.175);
  border: 1px solid rgba(245, 245, 245, 0.23);
  border-radius: 20px;
}

.tudum span {
  margin-right: 8px;
  font-weight: bold;
  font-size: 20px;
}

.tudum a {
  color: white;
}

.scroll-join-btn {
  display: block;
  min-width: 150px;
  height: 40px;
  margin: 25px auto 0;
  background: orangered;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}

.scroll-join-btn:hover {
  opacity: 0.9;
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
  border: 1px solid black;
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

.footer {
  max-width: 1150px;
  margin: 45px auto 0;
  padding: 5px 5px 20px;
  color: whitesmoke;
}

.contact {
  display: inline-block;
  margin-bottom: 30px;
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.footer-links div {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-links a {
  color: whitesmoke;
  font-size: 13px;
  text-decoration: underline;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: mediumblue;
}

.language-wrapper {
  position: relative;
  display: inline-block;
  margin-top: 45px;
}

.language {
  padding: 9px 18px;
  min-width: 135px;
  color: white;
  background: transparent;
  border: 1px solid gray;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

.language span {
  margin-left: 8px;
  font-size: 10px;
}

.language-menu {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 0;
  width: 170px;
  padding: 6px;
  background: black;
  border: 1px solid gray;
  border-radius: 8px;
  z-index: 100;
}

.language-menu button {
  width: 100%;
  padding: 10px;
  color: white;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
}

.language-menu button:hover {
  background: gray;
}

@media (max-width: 900px) {
  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 550px) {
  .page {
    padding: 25px 15px;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }

  .discover {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .footer {
    padding: 25px 15px 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 15px;
  }

  .footer-links a {
    font-size: 12px;
  }

  .scroll-join-btn {
    margin-top: 20px;
  }
}
</style>
