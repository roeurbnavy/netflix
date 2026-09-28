<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { useAuthStore } from '@/stores/auth'

const movieStore = useMovieStore()
const authStore = useAuthStore()

const movie = computed(() => movieStore.featuredMovie)

const backdropStyle = computed(() => {
  if (movie.value?.backdrop_path) {
    return {
      backgroundImage: `linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0.4) 60%, rgba(20, 20, 20, 0.8) 100%), url(${movieStore.getBackdropUrl(movie.value.backdrop_path)})`,
    }
  }
  return {
    backgroundImage: `linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0.4) 60%, rgba(20, 20, 20, 0.8) 100%), url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg')`,
  }
})

const truncatedOverview = computed(() => {
  if (!movie.value?.overview) return ''
  return movie.value.overview.length > 200
    ? movie.value.overview.slice(0, 200) + '...'
    : movie.value.overview
})

function handlePlay() {
  if (movie.value?.id) {
    movieStore.playTrailer(movie.value.id)
  }
}

function handleMoreInfo() {
  if (movie.value) {
    movieStore.openMovieDetail(movie.value)
  }
}
</script>

<template>
  <section class="hero-section" :style="backdropStyle">
    <div class="hero-content">
      <div v-if="movie" class="featured-content">
        <span class="badge-exclusive">&#9733; FEATURED SPOTLIGHT</span>
        <h1 class="hero-title">{{ movie.title || movie.name }}</h1>
        <p class="hero-overview">{{ truncatedOverview }}</p>

        <div class="hero-buttons">
          <button class="btn btn-play" @click="handlePlay">
            <span class="icon">&#9658;</span>
            Play Trailer
          </button>
          <button class="btn btn-info" @click="handleMoreInfo">
            <span class="icon">&#9432;</span>
            More Info
          </button>
        </div>
      </div>

      <div v-else class="hero-fallback">
        <h1 class="hero-title">Unlimited movies, TV shows, and more</h1>
        <p class="hero-subtitle">Watch anywhere. Cancel anytime.</p>
        <button class="btn btn-play" @click="authStore.openAuthModal()">
          Get Started
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: flex-end;
  padding: 140px 48px 120px;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: #fff;
  transition: background-image 0.5s ease-in-out;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 650px;
}

.badge-exclusive {
  display: inline-block;
  background-color: rgba(229, 9, 20, 0.9);
  color: #fff;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 4px;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 16px;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.9);
}

.hero-overview {
  font-size: 1.1rem;
  line-height: 1.5;
  color: #e5e5e5;
  margin-bottom: 24px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.2s ease;
}

.btn:active {
  transform: scale(0.97);
}

.btn-play {
  background-color: #fff;
  color: #000;
}

.btn-play:hover {
  background-color: rgba(255, 255, 255, 0.85);
}

.btn-info {
  background-color: rgba(109, 109, 110, 0.7);
  color: #fff;
}

.btn-info:hover {
  background-color: rgba(109, 109, 110, 0.4);
}

.icon {
  font-size: 18px;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: 120px 20px 80px;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .hero-overview {
    font-size: 0.95rem;
  }
}
</style>
