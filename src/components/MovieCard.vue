<script setup>
defineProps({ movie: { type: Object, required: true } })
</script>
<template>
  <div class="movie-card">
    <a :href="movie.link" target="_blank" rel="noopener noreferrer">
      <img :src="movie.image" :alt="movie.title" />
    </a>
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
    </div>
  </div>
</template>
<style scoped>
.movie-card {
  min-width: 180px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.movie-card:hover {
  transform: scale(1.08);
}
.movie-card a {
  display: block;
}
.movie-card img {
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
}
.movie-info h3 {
  color: white;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
}
</style>
