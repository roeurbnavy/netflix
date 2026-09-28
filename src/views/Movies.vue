<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import MovieRow from '@/components/MovieRow.vue'
import PricingPlans from '@/components/PricingPlans.vue'
import AuthModal from '@/components/AuthModal.vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()
</script>

<template>
  <div class="movies-page">
    <Navbar />
    <Hero />

    <main class="movies-content">
      <MovieRow title="Your Next Watch" :movies="movieStore.nextWatch" />
      <MovieRow title="Popular on Netflix" :movies="movieStore.popular" />
      <MovieRow title="Trending Now" :movies="movieStore.trending" />
    </main>

    <PricingPlans />
    <AuthModal />
  </div>
</template>

<style scoped>
.movies-page {
  min-height: 100vh;
  background-color: #141414;
  color: #fff;
  overflow-x: hidden;
}

.movies-content {
  position: relative;
  margin-top: -80px;
  z-index: 20;
  padding-bottom: 40px;
}

@media (max-width: 768px) {
  .movies-content {
    margin-top: 0;
  }
}
</style>
