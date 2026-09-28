<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface Plan {
  name: string
  quality: string
  price: string
  popular?: boolean
  link: string
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Mobile',
    quality: '480p',
    price: '2.99',
    link: 'https://www.netflix.com/signup',
    features: ['Fair video quality', 'For your phone or tablet'],
  },
  {
    name: 'Basic',
    quality: '720p',
    price: '3.99',
    link: 'https://www.netflix.com/signup',
    features: ['Good video quality', 'For your phone, tablet, laptop and TV'],
  },
  {
    name: 'Standard',
    quality: '1080p',
    price: '7.99',
    link: 'https://www.netflix.com/signup',
    features: ['Great video quality', 'For your phone, tablet, laptop and TV'],
  },
  {
    name: 'Premium',
    quality: '4K + HDR',
    price: '9.99',
    popular: true,
    link: 'https://www.netflix.com/signup',
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

function changeLanguage(lang: string) {
  selectedLanguage.value = lang
  showLanguages.value = false
}

function openPlan(plan: Plan) {
  if (plan.link) {
    window.open(plan.link, '_blank')
  }
}
</script>

<template>
  <div id="plans" class="pricing-page">
    <section class="plans">
      <h2 class="plans-title">A Plan To Suit Your Needs</h2>

      <div class="plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="plan-card"
          :class="{ popular: plan.popular }"
          @click="openPlan(plan)"
        >
          <span v-if="plan.popular" class="popular-badge">Most Popular</span>

          <h3 class="plan-name">{{ plan.name }}</h3>

          <div class="quality-badge">
            {{ plan.quality }}
          </div>

          <ul class="features-list">
            <li v-for="feature in plan.features" :key="feature">
              <span class="check-icon">&#10003;</span>
              {{ feature }}
            </li>
          </ul>

          <div class="plan-price">USD {{ plan.price }}<span>/mo</span></div>
        </div>
      </div>
    </section>

    <section class="discover">
      <h2>Discover your next favorites, plus new releases every week</h2>
      <a
        href="https://www.netflix.com/kh/"
        target="_blank"
        rel="noopener noreferrer"
        class="discover-btn"
      >
        More About Netflix
      </a>
    </section>

    <div class="tudum-banner">
      <span class="tudum-badge">T</span>
      <span>
        Read about Netflix TV shows and movies and watch bonus videos on
        <strong>
          <a href="https://www.netflix.com/tudum" target="_blank" rel="noopener noreferrer">
            Tudum.com
          </a>
        </strong>
      </span>
    </div>

    <div class="join-banner">
      <button class="scroll-join-btn" @click="authStore.openAuthModal()">Join Now</button>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <a href="https://help.netflix.com/en/contactus" target="_blank" class="contact-link">
          Questions? Contact us.
        </a>

        <div class="footer-links">
          <div>
            <a href="https://help.netflix.com/en/node/412" target="_blank">FAQ</a>
            <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" target="_blank">
              Investor Relations
            </a>
            <a href="https://help.netflix.com/legal/privacy" target="_blank">Privacy</a>
            <a href="https://fast.com/" target="_blank">Speed Test</a>
          </div>

          <div>
            <a href="https://help.netflix.com/en" target="_blank">Help Center</a>
            <a href="https://jobs.netflix.com/" target="_blank">Jobs</a>
            <a href="https://www.netflix.com/kh/browse/genre/34399" target="_blank">
              Cookie Preferences
            </a>
            <a href="https://help.netflix.com/legal/notices" target="_blank">Legal Notices</a>
          </div>

          <div>
            <a href="https://www.netflix.com/kh/login" target="_blank">Account</a>
            <a href="https://help.netflix.com/en/node/14361" target="_blank">Ways to Watch</a>
            <a href="https://help.netflix.com/en/node/134094" target="_blank">
              Corporate Information
            </a>
            <a href="https://www.netflix.com/kh/browse/genre/839338" target="_blank">
              Only on Netflix
            </a>
          </div>

          <div>
            <a href="https://media.netflix.com/en/" target="_blank">Media Center</a>
            <a href="https://help.netflix.com/legal/termsofuse" target="_blank">Terms of Use</a>
            <a href="https://help.netflix.com/en/contactus" target="_blank">Contact Us</a>
          </div>
        </div>

        <div class="language-wrapper">
          <button class="language-btn" @click="showLanguages = !showLanguages">
            {{ selectedLanguage }}
            <span class="arrow-up">&#9662;</span>
          </button>

          <div v-if="showLanguages" class="language-menu">
            <button
              v-for="language in languages"
              :key="language"
              @click="changeLanguage(language)"
            >
              {{ language }}
            </button>
          </div>
        </div>

        <p class="copyright">Netflix Cambodia Clone</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.pricing-page {
  padding: 60px 48px 40px;
  color: #fff;
  background: #000;
  border-top: 8px solid #222;
}

.plans {
  max-width: 1200px;
  margin: 0 auto;
}

.plans-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: left;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.plan-card {
  position: relative;
  background: linear-gradient(135deg, #1c1c1c 0%, #111 100%);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 28px 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.plan-card:hover {
  transform: translateY(-6px);
  border-color: #666;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.plan-card.popular {
  border: 2px solid #e50914;
  background: linear-gradient(135deg, #221415 0%, #141414 100%);
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 18px;
  background: #e50914;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}

.plan-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.quality-badge {
  display: inline-block;
  background: #2a2a2a;
  color: #ccc;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  align-self: flex-start;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;
}

.features-list li {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.check-icon {
  color: #e50914;
  font-weight: bold;
}

.plan-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
}

.plan-price span {
  font-size: 0.9rem;
  font-weight: 400;
  color: #aaa;
}

.discover {
  max-width: 1200px;
  margin: 60px auto 40px;
  text-align: center;
  padding: 40px 24px;
  background: #141414;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
}

.discover h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.discover-btn {
  display: inline-block;
  padding: 12px 28px;
  background: #e50914;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 15px;
  transition: background-color 0.2s;
}

.discover-btn:hover {
  background: #c11119;
}

.tudum-banner {
  max-width: 1200px;
  margin: 0 auto 30px;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #ccc;
}

.tudum-badge {
  background: #e50914;
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
}

.tudum-banner a {
  color: #fff;
  text-decoration: underline;
}

.join-banner {
  text-align: center;
  margin: 40px auto;
}

.scroll-join-btn {
  padding: 14px 44px;
  font-size: 18px;
  font-weight: 700;
  background: #e50914;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.scroll-join-btn:hover {
  background: #c11119;
}

.footer {
  border-top: 1px solid #2a2a2a;
  padding-top: 40px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-link {
  color: #aaa;
  text-decoration: none;
  font-size: 15px;
  display: inline-block;
  margin-bottom: 24px;
}

.contact-link:hover {
  text-decoration: underline;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.footer-links a {
  display: block;
  color: #888;
  font-size: 13px;
  text-decoration: none;
  margin-bottom: 12px;
}

.footer-links a:hover {
  text-decoration: underline;
  color: #aaa;
}

.language-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.language-btn {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 6px;
  background: #1f1f1f;
  border: 1px solid #444;
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 100;
}

.language-menu button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  background: none;
  border: none;
  color: #eee;
  font-size: 13px;
  cursor: pointer;
}

.language-menu button:hover {
  background: #333;
}

.copyright {
  color: #666;
  font-size: 12px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .pricing-page {
    padding: 40px 20px;
  }
}
</style>
