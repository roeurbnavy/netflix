# Netflix Clone (Vue 3 + TypeScript + TMDB API)

A modern, responsive Netflix Clone built with **Vue 3**, **Vite**, **TypeScript**, **Pinia**, and powered by real-time data from **The Movie Database (TMDB) API**.

---

## 📑 តារាងមាតិកា (Table of Contents)

- [១. រចនាសម្ព័ន្ធ Project & TMDB Flow](#១-រចនាសម្ព័ន្ធ-project--tmdb-flow)
- [២. ការកំណត់ API Key / Token (.env)](#២-ការកំណត់-api-key--token-env)
- [៣. របៀបប្រើប្រាស់ TMDB Service Layer](#៣-របៀបប្រើប្រាស់-tmdb-service-layer)
- [៤. របៀបប្រើប្រាស់តាមរយៈ Pinia Store](#៤-របៀបប្រើប្រាស់តាមរយៈ-pinia-store)
- [៥. របៀបបន្ថែម Category ឬ Endpoint ថ្មីៗ](#៥-របៀបបន្ថែម-category-ឬ-endpoint-ថ្មីៗ)
- [៦. របៀបទាញយករូបភាព និង Trailer ពី TMDB](#៦-របៀបទាញយករូបភាព-និង-trailer-ពី-tmdb)
- [៧. របៀបដំណើរការ Local (Getting Started)](#៧-របៀបដំណើរការ-local-getting-started)
- [៨. ការរៀបចំ និង Deploy លើ Netlify (Hosting Guide)](#៨-ការរៀបចំ-និង-deploy-លើ-netlify-hosting-guide)

---

## ១. រចនាសម្ព័ន្ធ Project & TMDB Flow

ទិន្នន័យពី TMDB ធ្វើដំណើរតាមលំដាប់លំដោយស្ថាបត្យកម្មដូចខាងក្រោម៖

```
[TMDB API (v3)]
       │ (Authorization: Bearer Token)
       ▼
[src/services/tmdb.ts]   <-- HTTP Service Client (API Endpoints & Fetch logic)
       │
       ▼
[src/stores/movies.ts]   <-- Pinia Store (State, Caching, Filter, Search, Details)
       │
       ▼
[Vue Components / Views] <-- UI Rendering (Hero, MovieRow, MovieCard, MovieDetailModal)
```

### ឯកសារពាក់ព័ន្ធសំខាន់ៗ៖

- [`.env`](.env) : ផ្ទុក TMDB Bearer Token ដោយសុវត្ថិភាព
- [`src/services/tmdb.ts`](src/services/tmdb.ts) : មុខងារទាក់ទង TMDB API ទាំងអស់
- [`src/stores/movies.ts`](src/stores/movies.ts) : State Management សម្រាប់ Movies, Search និង Trailers
- [`src/views/Movies.vue`](src/views/Movies.vue) : ទំព័រចម្បងដែល render បញ្ជីកុនតាមប្រភេទ
- [`src/components/Hero.vue`](src/components/Hero.vue) : ផ្ទាំង Banner Spotlight ដែលទាញយក Trending Movie មកបង្ហាញ
- [`src/components/MovieDetailModal.vue`](src/components/MovieDetailModal.vue) : ផ្ទាំង Popup មើលព័ត៌មានលម្អិតកុន និង YouTube Trailer
- [`netlify.toml`](netlify.toml) & [`public/_redirects`](public/_redirects) : Configuration សម្រាប់ Host លើ Netlify (ដោះស្រាយបញ្ហា 404 SPA)

---

## ២. ការកំណត់ API Key / Token (.env)

បង្កើតឯកសារ `.env` នៅ Root directory នៃគម្រោង (ប្រសិនបើមិនទាន់មាន) ដោយចម្លងតាមគំរូ `.env.example`៖

```env
VITE_TMDB_API_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjlhMTc5YjNlNTk2ZmNjMTJiNGUwYzVhN2NlMjk2MyIsIm5iZiI6MTc4OTk3Mzk5MS40Nywic3ViIjoiNmFiMGQ1ZTc5NWZiNTYwNzA1ZjY2YjFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CZ0d82-_9vt6U2m5fLEhApci7kns0Lojt9E5fZ8c3Yw
```

> **ចំណាំ:** អថេរដែលផ្តើមដោយ `VITE_` អាចត្រូវបានហៅប្រើនៅក្នុងកូដ Client-side តាមរយៈ `import.meta.env.VITE_TMDB_API_TOKEN`។

---

## ៣. របៀបប្រើប្រាស់ TMDB Service Layer

ឯកសារ [`src/services/tmdb.ts`](src/services/tmdb.ts) ផ្តល់នូវ functions ស្រាប់សម្រាប់ទាញយកទិន្នន័យ៖

```typescript
import { tmdbService } from '@/services/tmdb'

// ១. ទាញយកកុន Trending ប្រចាំសប្តាហ៍
const trending = await tmdbService.getTrending()

// ២. ទាញយកកុនល្បីៗ (Popular)
const popular = await tmdbService.getPopular()

// ៣. ទាញយកកុនពិន្ទុខ្ពស់ (Top Rated)
const topRated = await tmdbService.getTopRated()

// ៤. ស្វែងរកកុនតាមពាក្យគន្លឹះ (Search)
const searchResult = await tmdbService.searchMovies('Avatar')

// ៥. ទាញយកវីដេអូ Trailers នៃកុនណាមួយ (តាម Movie ID)
const videos = await tmdbService.getMovieVideos(1423191)

// ៦. ទាញយកព័ត៌មានលម្អិត (Movie Details)
const details = await tmdbService.getMovieDetails(1423191)
```

---

## ៤. របៀបប្រើប្រាស់តាមរយៈ Pinia Store

ដើម្បីកុំឱ្យពិបាក Fetch ដដែលៗក្នុង Component យើងប្រើ `useMovieStore()` ក្នុង Pinia៖

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()

onMounted(() => {
  // ទាញយក categories ទាំងអស់ពី TMDB ដោយស្វ័យប្រវត្តិ
  movieStore.fetchAllCategories()
})
</script>

<template>
  <div>
    <!-- បង្ហាញ Featured Movie -->
    <h1>{{ movieStore.featuredMovie?.title }}</h1>

    <!-- បង្ហាញ Trending Movies -->
    <div v-for="movie in movieStore.trending" :key="movie.id">
      <img :src="movieStore.getPosterUrl(movie.poster_path)" />
      <p>{{ movie.title }} (⭐ {{ movie.vote_average.toFixed(1) }})</p>

      <!-- បើក Modal មើលព័ត៌មានលម្អិត -->
      <button @click="movieStore.openMovieDetail(movie)">Details</button>

      <!-- បើកមើល YouTube Trailer ភ្លាមៗ -->
      <button @click="movieStore.playTrailer(movie.id)">Play Trailer</button>
    </div>
  </div>
</template>
```

---

## ៥. របៀបបន្ថែម Category ឬ Endpoint ថ្មីៗ

ប្រសិនបើអ្នកចង់បន្ថែមប្រភេទកុនថ្មី (ឧទាហរណ៍៖ **Action Movies** ឬ **Anime**):

### ជំហានទី ១: បន្ថែម function ក្នុង `src/services/tmdb.ts`

```typescript
export const tmdbService = {
  // ... កូដចាស់ ...

  getActionMovies: () =>
    request<TMDBResponse<TMDBMovie>>('/discover/movie', {
      with_genres: '28',
      sort_by: 'popularity.desc',
    }),
}
```

### ជំហានទី ២: បន្ថែម State ក្នុង `src/stores/movies.ts`

```typescript
const actionMovies = ref<TMDBMovie[]>([])

async function fetchAllCategories() {
  // ...
  const actionRes = await tmdbService.getActionMovies()
  actionMovies.value = actionRes.results.filter((m) => m.poster_path)
}

return {
  // ...
  actionMovies,
}
```

### ជំហានទី ៣: ហៅប្រើក្នុង `src/views/Movies.vue`

```vue
<MovieRow title="Action Blockbusters" :movies="movieStore.actionMovies" />
```

---

## ៦. របៀបទាញយករូបភាព និង Trailer ពី TMDB

### ក. ទាញយករូបភាព (Image CDN)

- **Poster (កម្រិតទទឹង 500px):**
  ```typescript
  movieStore.getPosterUrl(movie.poster_path) // https://image.tmdb.org/t/p/w500/...
  ```
- **Backdrop (កម្រិតច្បាស់ដើម Original / 4K):**
  ```typescript
  movieStore.getBackdropUrl(movie.backdrop_path) // https://image.tmdb.org/t/p/original/...
  ```

### ខ. ចាក់បញ្ចាំង Trailer (YouTube Embed)

តាមរយៈ `tmdbService.getMovieVideos(movieId)` យើងស្វែងរកវីដេអូ YouTube Trailer រួចយក `key` មកដាក់ក្នុង iframe:

```html
<iframe :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1`"></iframe>
```

---

## ៧. របៀបដំណើរការ Local (Getting Started)

```sh
# ១. ដំឡើង Dependencies
npm install

# ២. ដំណើរការ Local Dev Server
npm run dev

# ៣. ពិនិត្យ Typescript & Build Production
npm run build
```

---

## ៨. ការរៀបចំ និង Deploy លើ Netlify (Hosting Guide)

ដើម្បី Host គេហទំព័រនេះនៅលើ **Netlify** ឱ្យដំណើរការបានរលូន និងមិនជួបបញ្ហា Error (ដូចជា 404 Not Found ពេល Refresh ទំព័រ ឬអត់ស្គាល់ API Token) សូមអនុវត្តតាមជំហានខាងក្រោម៖

### ក. Configuration Files ដែលមានស្រាប់ក្នុងគម្រោង

គម្រោងនេះមានឯកសារកំណត់រួចជាស្រេច៖

1. **[`netlify.toml`](netlify.toml)** : កំណត់ Build Command (`npm run build`), Publish Folder (`dist`) និង SPA Redirects (`/* -> /index.html 200`)។
2. **[`public/_redirects`](public/_redirects)** : ការពារបញ្ហា 404 នៅពេល User ចូលទៅកាន់ Route ផ្សេងៗដូចជា `/movies` ឬ `/signin` រួចចុច Refresh (F5)។

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### ខ. ជំហាន Deploy នៅលើ Netlify Dashboard

#### ជំហានទី ១: ភ្ជាប់ទៅកាន់ GitHub

1. ចូលទៅកាន់ [app.netlify.com](https://app.netlify.com/) (Login ជាមួយគណនី GitHub)
2. ចុចលើ **Add new site** ➔ **Import an existing project**
3. ជ្រើសរើស **GitHub** រួចជ្រើសយក Repository: **`roeurbnavy/netflix`**

#### ជំហានទី ២: ពិនិត្យមើល Build Settings

Netlify នឹងចាប់យកដោយស្វ័យប្រវត្តិនូវ៖

- **Branch to deploy:** `main` (ឬ `movie-api`)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### ជំហានទី ៣: បញ្ចូល Environment Variable (ចាំបាច់បំផុត ⚠️)

ដោយសារឯកសារ `.env` មិនត្រូវបាន Push ទៅកាន់ GitHub ដើម្បីសុវត្ថិភាព អ្នកត្រូវកំណត់ Variable នេះលើ Netlify៖

1. នៅទំព័រ Deploy ឬចូលទៅ **Site configuration** ➔ **Environment variables** ➔ **Add a variable**
2. បញ្ចូលព័ត៌មានដូចខាងក្រោម៖
   - **Key:** `VITE_TMDB_API_TOKEN`
   - **Value:** `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjlhMTc5YjNlNTk2ZmNjMTJiNGUwYzVhN2NlMjk2MyIsIm5iZiI6MTc4OTk3Mzk5MS40Nywic3ViIjoiNmFiMGQ1ZTc5NWZiNTYwNzA1ZjY2YjFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CZ0d82-_9vt6U2m5fLEhApci7kns0Lojt9E5fZ8c3Yw`
3. ចុច **Save**។

#### ជំហានទី ៤: ចុច Deploy Site

- ចុចលើប៊ូតុង **Deploy site**
- រង់ចាំប្រហែល ៣០ វិនាទីទៅ ១ នាទី Netlify នឹង Build ចប់រួចចេញ Live URL (ឧ. `https://your-app-name.netlify.app`) សម្រាប់ចូលទស្សនាជាសាធារណៈ!

---

### គ. ការដោះស្រាយបញ្ហាទូទៅ (Troubleshooting)

| បញ្ហា (Issue)                             | មូលហេតុ (Cause)                             | ដំណោះស្រាយ (Solution)                                                                                         |
| ----------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **ទំព័រមិនបង្ហាញទិន្នន័យកុន (No Movies)** | ភ្លេចកំណត់ `VITE_TMDB_API_TOKEN` លើ Netlify | ចូលទៅ `Site configuration > Environment variables` រួចបន្ថែម `VITE_TMDB_API_TOKEN` ហើយ Trigger deploy ម្តងទៀត |
| **លោត 404 Not Found ពេល Refresh ទំព័រ**   | ខ្វះ SPA Redirect Rule                      | ត្រូវប្រាកដថាឯកសារ `netlify.toml` ឬ `public/_redirects` ត្រូវបាន Commit & Push ឡើងទៅ GitHub                   |
