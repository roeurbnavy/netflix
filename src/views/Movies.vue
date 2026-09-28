<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import MovieRow from '@/components/MovieRow.vue'
import MovieCard from '@/components/MovieCard.vue'
import PricingPlans from '@/components/PricingPlans.vue'
import AuthModal from '@/components/AuthModal.vue'
import MovieDetailModal from '@/components/MovieDetailModal.vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.fetchAllCategories()
})
</script>

<template>
  <div class="movies-page">
    <Navbar />

    <!-- If user is searching, show Live Search Results Grid -->
    <div v-if="movieStore.searchQuery" class="search-view">
      <div class="search-header">
        <h2>
          Search Results for: <span class="query-text">"{{ movieStore.searchQuery }}"</span>
        </h2>
        <button class="clear-search-btn" @click="movieStore.clearSearch">Clear Search</button>
      </div>

      <div v-if="movieStore.isSearching" class="loading-state">
        <div class="spinner"></div>
        <p>Searching movies on TMDB...</p>
      </div>

      <div
        v-else-if="movieStore.searchResults.length > 0"
        class="search-grid"
      >
        <MovieCard
          v-for="movie in movieStore.searchResults"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <div v-else class="empty-state">
        <p>No titles matched your search query. Try another keyword!</p>
      </div>
    </div>

    <!-- Default Landing Page with Hero and Category Rows -->
    <div v-else>
      <Hero />

      <main class="movies-content">
        <!-- Loading State for categories -->
        <div v-if="movieStore.isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading real-time titles from TMDB...</p>
        </div>

        <template v-else>
          <MovieRow
            v-if="movieStore.trending.length > 0"
            title="Trending This Week"
            :movies="movieStore.trending"
          />

          <MovieRow
            v-if="movieStore.popular.length > 0"
            title="Popular on Netflix"
            :movies="movieStore.popular"
          />

          <MovieRow
            v-if="movieStore.topRated.length > 0"
            title="Top Rated Masterpieces"
            :movies="movieStore.topRated"
          />

          <MovieRow
            v-if="movieStore.nowPlaying.length > 0"
            title="Now In Theatres & Streaming"
            :movies="movieStore.nowPlaying"
          />

          <MovieRow
            v-if="movieStore.upcoming.length > 0"
            title="Upcoming Anticipated Releases"
            :movies="movieStore.upcoming"
          />
        </template>
      </main>

      <PricingPlans />
    </div>

    <MovieDetailModal />
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
  margin-top: -60px;
  z-index: 20;
  padding-bottom: 40px;
}

.search-view {
  padding: 120px 48px 60px;
  min-height: 80vh;
}

.search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.search-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.query-text {
  color: #e50914;
}

.clear-search-btn {
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.clear-search-btn:hover {
  background-color: #444;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 16px;
  color: #aaa;
  font-size: 15px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(229, 9, 20, 0.2);
  border-top-color: #e50914;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
  color: #888;
  font-size: 16px;
}

@media (max-width: 768px) {
  .movies-content {
    margin-top: 0;
  }
  .search-view {
    padding: 100px 20px 40px;
  }
  .search-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
