<script setup lang="ts">
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
import type { Movie } from '@/stores/movies'

defineProps<{
  title: string
  movies: Movie[]
}>()

const row = ref<HTMLElement | null>(null)

function scrollRow(direction: number) {
  if (row.value) {
    row.value.scrollBy({
      left: direction * 600,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <section class="movie-section">
    <h2 class="section-title">{{ title }}</h2>

    <div class="movie-container">
      <button
        class="arrow left"
        aria-label="Scroll left"
        @click="scrollRow(-1)"
      >
        &#8249;
      </button>

      <div ref="row" class="movie-row">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <button
        class="arrow right"
        aria-label="Scroll right"
        @click="scrollRow(1)"
      >
        &#8250;
      </button>
    </div>
  </section>
</template>

<style scoped>
.movie-section {
  width: 100%;
  padding: 24px 48px;
  box-sizing: border-box;
}

.section-title {
  color: #e5e5e5;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.section-title:hover {
  color: #fff;
}

.movie-container {
  position: relative;
  width: 100%;
}

.movie-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 12px 0;
}

.movie-row::-webkit-scrollbar {
  display: none;
}

.arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50px;
  border: none;
  color: #fff;
  font-size: 48px;
  cursor: pointer;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.25s ease, background 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.movie-container:hover .arrow {
  opacity: 0.9;
}

.arrow:hover {
  opacity: 1 !important;
  transform: scale(1.05);
}

.arrow.left {
  left: 0;
  background: linear-gradient(to right, rgba(20, 20, 20, 0.9), transparent);
}

.arrow.right {
  right: 0;
  background: linear-gradient(to left, rgba(20, 20, 20, 0.9), transparent);
}

@media (max-width: 768px) {
  .movie-section {
    padding: 16px 20px;
  }

  .arrow {
    display: none;
  }

  .section-title {
    font-size: 18px;
  }
}
</style>
