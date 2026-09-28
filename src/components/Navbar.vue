<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMovieStore } from '@/stores/movies'

const router = useRouter()
const authStore = useAuthStore()
const movieStore = useMovieStore()

const isScrolled = ref(false)
const isSearchOpen = ref(false)
const searchInput = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function handleAuthClick() {
  if (authStore.isLoggedIn) {
    authStore.logout()
  } else {
    authStore.openAuthModal()
  }
}

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchInput.value = ''
    movieStore.clearSearch()
  }
}

watch(searchInput, (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    movieStore.search(newQuery)
  }, 350)
})

function goToHome() {
  searchInput.value = ''
  movieStore.clearSearch()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <div class="nav-left">
        <h1 class="logo" @click="goToHome">NETFLIX</h1>
        <nav class="nav-links">
          <router-link to="/" class="nav-link active">Home</router-link>
          <router-link to="/movies" class="nav-link">Movies</router-link>
          <a href="#plans" class="nav-link">Plans</a>
        </nav>
      </div>

      <div class="nav-right">
        <!-- Live Movie Search Bar -->
        <div class="search-box" :class="{ active: isSearchOpen }">
          <button class="search-toggle-btn" aria-label="Search" @click="toggleSearch">
            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
          <input
            v-if="isSearchOpen"
            v-model="searchInput"
            type="text"
            placeholder="Titles, people, genres..."
            class="search-input"
            autofocus
          />
        </div>

        <template v-if="authStore.isLoggedIn">
          <span class="user-greeting">{{ authStore.currentUser?.email }}</span>
          <button class="auth-btn logout-btn" @click="handleAuthClick">Sign Out</button>
        </template>
        <template v-else>
          <button class="auth-btn sign-in-btn" @click="handleAuthClick">Sign In</button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 18px 48px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  transition: background-color 0.3s ease, padding 0.3s ease;
}

.header.scrolled {
  background-color: #141414;
  padding: 12px 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 36px;
}

.logo {
  color: #e50914;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Search bar styling */
.search-box {
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 4px;
  padding: 2px 6px;
  transition: background-color 0.3s, border 0.3s;
}

.search-box.active {
  background-color: rgba(0, 0, 0, 0.85);
  border: 1px solid #777;
}

.search-toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.search-input {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;
  width: 220px;
  padding: 6px 8px;
}

.search-input::placeholder {
  color: #888;
}

.user-greeting {
  color: #e5e5e5;
  font-size: 14px;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.auth-btn {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.auth-btn:active {
  transform: scale(0.98);
}

.sign-in-btn {
  background-color: #e50914;
  color: #fff;
}

.sign-in-btn:hover {
  background-color: #c11119;
}

.logout-btn {
  background-color: #333;
  color: #fff;
}

.logout-btn:hover {
  background-color: #444;
}

@media (max-width: 768px) {
  .header {
    padding: 14px 20px;
  }

  .header.scrolled {
    padding: 10px 20px;
  }

  .nav-links {
    display: none;
  }

  .logo {
    font-size: 22px;
  }

  .user-greeting {
    display: none;
  }

  .search-input {
    width: 130px;
  }
}
</style>
