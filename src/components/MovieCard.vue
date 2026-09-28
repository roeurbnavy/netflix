<script setup lang="ts">
import { useMovieStore } from '@/stores/movies'
import type { TMDBMovie } from '@/services/tmdb'

const props = defineProps<{
  movie: TMDBMovie
}>()

const movieStore = useMovieStore()

function handleClick() {
  movieStore.openMovieDetail(props.movie)
}
</script>

<template>
  <div class="movie-card" @click="handleClick">
    <div class="image-wrapper">
      <img
        :src="movieStore.getPosterUrl(movie.poster_path)"
        :alt="movie.title || movie.name"
        loading="lazy"
      />
      <div class="hover-overlay">
        <span class="rating-pill">&#9733; {{ movie.vote_average.toFixed(1) }}</span>
        <button class="preview-btn" aria-label="View movie details">
          <span class="play-icon">&#9658;</span>
        </button>
        <p class="watch-text">View Details</p>
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title || movie.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  flex: 0 0 190px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
}

.movie-card:hover {
  transform: scale(1.08);
  z-index: 10;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 275px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #222;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.25s ease;
  padding: 12px;
}

.movie-card:hover .hover-overlay {
  opacity: 1;
}

.rating-pill {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffbc00;
  font-weight: 700;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 188, 0, 0.3);
}

.preview-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #e50914;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(229, 9, 20, 0.6);
  transition: transform 0.15s ease;
}

.preview-btn:hover {
  transform: scale(1.1);
}

.play-icon {
  font-size: 18px;
  margin-left: 2px;
}

.watch-text {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.movie-info {
  padding: 8px 4px 4px;
}

.movie-title {
  color: #e5e5e5;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.movie-card:hover .movie-title {
  color: #fff;
}

@media (max-width: 768px) {
  .movie-card {
    flex: 0 0 140px;
  }
  .image-wrapper {
    height: 200px;
  }
  .movie-title {
    font-size: 12px;
  }
}
</style>
