<script setup>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
defineProps({
  title: String,
  movies: Array,
})
const row = ref(null)
function scrollRow(direction) {
  if (row.value) {
    row.value.scrollBy({
      left: direction * 500,
      behavior: 'smooth',
    })
  }
}
</script>
<template>
  <section class="movie-section">
    <h2>{{ title }}</h2>

    <div class="movie-container">
      <button class="arrow left" @click="scrollRow(-1)"><</button>

      <div ref="row" class="movie-row">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <button class="arrow right" @click="scrollRow(1)">></button>
    </div>
  </section>
</template>
<style scoped>
.movie-section {
  width: 100%;
  padding: 40px 150px;
  box-sizing: border-box;
}

h2 {
  color: white;
  font-size: 22px;
  margin-bottom: 15px;
}

.movie-container {
  position: relative;
  width: 100%;
}
.movie-row {
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 10px 0;
}

.movie-row::-webkit-scrollbar {
  display: none;
}
.arrow {
  position: absolute;
  top: 0;
  height: 100%;
  width: 65px;
  border: none;
  color: white;
  font-size: 35px;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.movie-container:hover .arrow {
  opacity: 1;
}

.arrow.left {
  left: 0;
  background: linear-gradient(to right, black, transparent);
}
.arrow.right {
  right: 0;
  background: linear-gradient(to left, black, transparent);
}
@media (max-width: 1024px) {
  .movie-section {
    padding: 35px 60px;
  }

  .arrow {
    width: 55px;
    font-size: 30px;
  }
}
@media (max-width: 768px) {
  .movie-section {
    padding: 30px 25px;
  }

  h2 {
    font-size: 20px;
  }

  .movie-row {
    gap: 12px;
  }

  .arrow {
    width: 45px;
    font-size: 25px;
  }
}
@media (max-width: 480px) {
  .movie-section {
    padding: 25px 15px;
  }

  h2 {
    font-size: 18px;
  }

  .movie-row {
    gap: 10px;
  }

  .arrow {
    width: 35px;
    font-size: 22px;
  }
}
</style>
