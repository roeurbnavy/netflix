const BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original'
export const TMDB_IMAGE_W500 = 'https://image.tmdb.org/t/p/w500'
export const TMDB_IMAGE_W1280 = 'https://image.tmdb.org/t/p/w1280'

const token = import.meta.env.VITE_TMDB_API_TOKEN

export interface TMDBMovie {
  id: number
  title: string
  original_title?: string
  name?: string // TV shows
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  genre_ids?: number[]
  popularity?: number
}

export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime?: number
  genres?: { id: number; name: string }[]
  tagline?: string
  status?: string
}

async function request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value)
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const tmdbService = {
  getTrending: () => request<TMDBResponse<TMDBMovie>>('/trending/movie/week'),
  getPopular: () => request<TMDBResponse<TMDBMovie>>('/movie/popular'),
  getTopRated: () => request<TMDBResponse<TMDBMovie>>('/movie/top_rated'),
  getNowPlaying: () => request<TMDBResponse<TMDBMovie>>('/movie/now_playing'),
  getUpcoming: () => request<TMDBResponse<TMDBMovie>>('/movie/upcoming'),
  searchMovies: (query: string) =>
    request<TMDBResponse<TMDBMovie>>('/search/movie', {
      query,
      include_adult: 'false',
    }),
  getMovieVideos: async (movieId: number): Promise<MovieVideo[]> => {
    const data = await request<{ id: number; results: MovieVideo[] }>(`/movie/${movieId}/videos`)
    return data.results || []
  },
  getMovieDetails: (movieId: number) => request<TMDBMovieDetail>(`/movie/${movieId}`),
}
