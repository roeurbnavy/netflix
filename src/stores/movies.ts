import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  tmdbService,
  type TMDBMovie,
  type TMDBMovieDetail,
  type MovieVideo,
  TMDB_IMAGE_W500,
  TMDB_IMAGE_ORIGINAL,
} from '@/services/tmdb'

export type Movie = TMDBMovie

export const useMovieStore = defineStore('movies', () => {
  const featuredMovie = ref<TMDBMovie | null>(null)
  const trending = ref<TMDBMovie[]>([])
  const popular = ref<TMDBMovie[]>([])
  const topRated = ref<TMDBMovie[]>([])
  const nowPlaying = ref<TMDBMovie[]>([])
  const upcoming = ref<TMDBMovie[]>([])

  const searchQuery = ref('')
  const searchResults = ref<TMDBMovie[]>([])
  const isSearching = ref(false)

  const selectedMovie = ref<TMDBMovieDetail | TMDBMovie | null>(null)
  const isDetailOpen = ref(false)

  const activeTrailerKey = ref<string | null>(null)
  const isTrailerOpen = ref(false)
  const isLoadingTrailer = ref(false)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function getPosterUrl(path: string | null): string {
    if (!path) {
      return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80'
    }
    return `${TMDB_IMAGE_W500}${path}`
  }

  function getBackdropUrl(path: string | null): string {
    if (!path) {
      return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=80'
    }
    return `${TMDB_IMAGE_ORIGINAL}${path}`
  }

  async function fetchAllCategories() {
    isLoading.value = true
    error.value = null

    try {
      const [trendingRes, popularRes, topRatedRes, nowPlayingRes, upcomingRes] = await Promise.all([
        tmdbService.getTrending(),
        tmdbService.getPopular(),
        tmdbService.getTopRated(),
        tmdbService.getNowPlaying(),
        tmdbService.getUpcoming(),
      ])

      trending.value = trendingRes.results.filter((m) => m.backdrop_path && m.poster_path)
      popular.value = popularRes.results.filter((m) => m.backdrop_path && m.poster_path)
      topRated.value = topRatedRes.results.filter((m) => m.backdrop_path && m.poster_path)
      nowPlaying.value = nowPlayingRes.results.filter((m) => m.backdrop_path && m.poster_path)
      upcoming.value = upcomingRes.results.filter((m) => m.backdrop_path && m.poster_path)

      // Pick an epic movie with high backdrop quality for Hero banner
      if (trending.value.length > 0) {
        const topCandidates = trending.value.slice(0, 5)
        const randomFeatured = topCandidates[Math.floor(Math.random() * topCandidates.length)]
        featuredMovie.value = randomFeatured ?? trending.value[0] ?? null
      }
    } catch (err: unknown) {
      console.error('Failed to fetch TMDB data:', err)
      error.value = err instanceof Error ? err.message : 'Failed to fetch movies from TMDB'
    } finally {
      isLoading.value = false
    }
  }

  async function search(query: string) {
    searchQuery.value = query
    const trimmed = query.trim()

    if (!trimmed) {
      searchResults.value = []
      isSearching.value = false
      return
    }

    isSearching.value = true
    try {
      const res = await tmdbService.searchMovies(trimmed)
      searchResults.value = res.results.filter((m) => m.poster_path)
    } catch (err) {
      console.error('Search failed:', err)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  function clearSearch() {
    searchQuery.value = ''
    searchResults.value = []
    isSearching.value = false
  }

  async function openMovieDetail(movie: TMDBMovie) {
    selectedMovie.value = movie
    isDetailOpen.value = true

    try {
      const fullDetail = await tmdbService.getMovieDetails(movie.id)
      if (selectedMovie.value && selectedMovie.value.id === movie.id) {
        selectedMovie.value = fullDetail
      }
    } catch (err) {
      console.error('Could not load extra movie details:', err)
    }
  }

  function closeMovieDetail() {
    isDetailOpen.value = false
    selectedMovie.value = null
  }

  async function playTrailer(movieId: number) {
    isLoadingTrailer.value = true
    try {
      const videos = await tmdbService.getMovieVideos(movieId)
      const officialTrailer = videos.find(
        (v: MovieVideo) => v.site === 'YouTube' && v.type === 'Trailer' && v.official,
      )
      const anyTrailer = videos.find(
        (v: MovieVideo) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'),
      )
      const fallbackVideo = videos.find((v: MovieVideo) => v.site === 'YouTube')

      const selected = officialTrailer || anyTrailer || fallbackVideo

      if (selected) {
        activeTrailerKey.value = selected.key
        isTrailerOpen.value = true
      } else {
        alert('Sorry, no official YouTube trailer available for this title.')
      }
    } catch (err) {
      console.error('Failed to load movie trailer:', err)
      alert('Could not load trailer at this moment.')
    } finally {
      isLoadingTrailer.value = false
    }
  }

  function closeTrailer() {
    isTrailerOpen.value = false
    activeTrailerKey.value = null
  }

  return {
    featuredMovie,
    trending,
    popular,
    topRated,
    nowPlaying,
    upcoming,
    searchQuery,
    searchResults,
    isSearching,
    selectedMovie,
    isDetailOpen,
    activeTrailerKey,
    isTrailerOpen,
    isLoadingTrailer,
    isLoading,
    error,
    getPosterUrl,
    getBackdropUrl,
    fetchAllCategories,
    search,
    clearSearch,
    openMovieDetail,
    closeMovieDetail,
    playTrailer,
    closeTrailer,
  }
})
