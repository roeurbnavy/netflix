<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'
import type { TMDBMovieDetail } from '@/services/tmdb'

const movieStore = useMovieStore()

const movie = computed(() => movieStore.selectedMovie)

const releaseYear = computed(() => {
  const date = movie.value?.release_date || movie.value?.first_air_date
  return date ? new Date(date).getFullYear() : 'N/A'
})

const ratingPercentage = computed(() => {
  if (!movie.value?.vote_average) return 85
  return Math.round(movie.value.vote_average * 10)
})

const genres = computed(() => {
  const detailed = movie.value as TMDBMovieDetail
  if (detailed?.genres && detailed.genres.length > 0) {
    return detailed.genres.map((g) => g.name)
  }
  return []
})

const runtimeFormatted = computed(() => {
  const detailed = movie.value as TMDBMovieDetail
  if (detailed?.runtime) {
    const hours = Math.floor(detailed.runtime / 60)
    const minutes = detailed.runtime % 60
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`
  }
  return null
})

function handlePlayTrailer() {
  if (movie.value?.id) {
    movieStore.playTrailer(movie.value.id)
  }
}
</script>

<template>
  <!-- Movie Details Modal -->
  <Transition name="modal-fade">
    <div
      v-if="movieStore.isDetailOpen && movie"
      class="detail-overlay"
      @click.self="movieStore.closeMovieDetail"
    >
      <div class="detail-card">
        <button
          class="modal-close-btn"
          aria-label="Close"
          @click="movieStore.closeMovieDetail"
        >
          &times;
        </button>

        <div
          class="detail-hero"
          :style="{
            backgroundImage: `linear-gradient(to top, #181818 0%, rgba(24, 24, 24, 0.4) 60%, transparent 100%), url(${movieStore.getBackdropUrl(movie.backdrop_path)})`,
          }"
        >
          <div class="hero-actions">
            <h2 class="detail-title">{{ movie.title || movie.name }}</h2>
            <div class="btn-group">
              <button class="btn play-btn" @click="handlePlayTrailer">
                <span class="icon">&#9658;</span>
                {{ movieStore.isLoadingTrailer ? 'Loading Trailer...' : 'Play Trailer' }}
              </button>
            </div>
          </div>
        </div>

        <div class="detail-body">
          <div class="meta-row">
            <span class="match-score">{{ ratingPercentage }}% Match</span>
            <span class="meta-item year">{{ releaseYear }}</span>
            <span v-if="runtimeFormatted" class="meta-item runtime">{{ runtimeFormatted }}</span>
            <span class="rating-badge">HD</span>
            <span class="imdb-score">&#9733; {{ movie.vote_average.toFixed(1) }} / 10</span>
          </div>

          <div v-if="genres.length > 0" class="genres-row">
            <span v-for="genre in genres" :key="genre" class="genre-tag">{{ genre }}</span>
          </div>

          <p class="overview">{{ movie.overview || 'No overview provided.' }}</p>
        </div>
      </div>
    </div>
  </Transition>

  <!-- YouTube Trailer Player Modal -->
  <Transition name="modal-fade">
    <div
      v-if="movieStore.isTrailerOpen && movieStore.activeTrailerKey"
      class="trailer-overlay"
      @click.self="movieStore.closeTrailer"
    >
      <div class="trailer-box">
        <button
          class="trailer-close-btn"
          aria-label="Close Trailer"
          @click="movieStore.closeTrailer"
        >
          &times;
        </button>

        <div class="iframe-container">
          <iframe
            :src="`https://www.youtube.com/embed/${movieStore.activeTrailerKey}?autoplay=1&rel=0`"
            title="Movie Trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.detail-overlay,
.trailer-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(6px);
}

.detail-card {
  position: relative;
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #181818;
  border-radius: 10px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.9);
  color: #fff;
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 50;
  background-color: #181818;
  border: 1px solid #444;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.modal-close-btn:hover {
  background-color: #333;
  transform: scale(1.1);
}

.detail-hero {
  height: 380px;
  background-size: cover;
  background-position: center top;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 36px 40px;
}

.hero-actions {
  width: 100%;
}

.detail-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.btn-group {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s, transform 0.1s;
}

.btn:active {
  transform: scale(0.97);
}

.play-btn {
  background-color: #fff;
  color: #000;
}

.play-btn:hover {
  background-color: rgba(255, 255, 255, 0.85);
}

.detail-body {
  padding: 30px 40px 40px;
}

.meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 15px;
}

.match-score {
  color: #46d369;
  font-weight: 700;
}

.meta-item {
  color: #aaa;
}

.rating-badge {
  border: 1px solid #777;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  color: #ccc;
}

.imdb-score {
  color: #ffbc00;
  font-weight: 600;
}

.genres-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.genre-tag {
  background-color: #2a2a2a;
  color: #ddd;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
}

.overview {
  font-size: 16px;
  line-height: 1.6;
  color: #e5e5e5;
}

/* Trailer overlay & iframe */
.trailer-box {
  position: relative;
  width: 100%;
  max-width: 900px;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.95);
}

.trailer-close-btn {
  position: absolute;
  top: -42px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
}

.iframe-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .detail-hero {
    height: 240px;
    padding: 20px;
  }
  .detail-title {
    font-size: 1.5rem;
  }
  .detail-body {
    padding: 20px;
  }
}
</style>
