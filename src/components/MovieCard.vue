<script setup lang="ts">
import type { Movie } from '@/stores/movies'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="movie-card">
    <a :href="movie.link" target="_blank" rel="noopener noreferrer" class="movie-link">
      <div class="image-wrapper">
        <img :src="movie.image" :alt="movie.title" loading="lazy" />
        <div class="hover-overlay">
          <span class="play-icon">&#9658;</span>
          <p class="watch-text">Watch on Netflix</p>
        </div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
      </div>
    </a>
  </div>
</template>

<style scoped>
.movie-card {
  flex: 0 0 190px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 8px;
  overflow: hidden;
}

.movie-card:hover {
  transform: scale(1.08);
  z-index: 10;
}

.movie-link {
  text-decoration: none;
  display: block;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 270px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #222;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  backdrop-filter: blur(2px);
}

.movie-card:hover .hover-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 32px;
  color: #fff;
  margin-bottom: 6px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
}

.watch-text {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
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
