<script setup>
import Navbar from '@/components/Navbar.vue'
import MoviRow from '@/components/MoviRow.vue'
import crat from '@/components/crat.vue'
const movies = [
  {
    id: 1,
    title: 'Moana',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzTWmQCpLbaP30BYeDrLN7OLax6Bu-7ppW5x89sZNsw&s=10',
    link: 'https://www.netflix.com/kh/title/82914439',
  },
  {
    id: 2,
    title: 'Samua Akan baik baik saja',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8mXvZF5v5YtqEpW9CNAxCZjdCPmBhaIYNxe2EUBfo4A&s=10',
    link: 'https://www.netflix.com/kh/title/82666022',
  },
  {
    id: 3,
    title: 'Swapped',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wZQzWaPnXh_DNaSpuGD7KbTVCIjSt9_vtn8yAL4cjw&s=10',
    link: 'ps://www.netflix.com/kh/title/81749852',
  },
  {
    id: 4,
    title: 'Despicable Me 4',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq0F2tnOZ9kMLldSzHpCX9MvoCHn9z3UpvlMac_YUUVw&s=10',
    link: 'https://www.netflix.com/kh/title/81776693',
  },
  {
    id: 5,
    title: 'The Thorn:One Sacredd Light',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa14Kg2duNu_8tLS0pxqHIhZM6xsSJbPBNaX3NZpmwiA&s=10',
    link: 'https://www.netflix.com/kh/title/82769787',
  },
  {
    id: 6,
    title: 'Troy',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6reIVBYHcsxpA7pCnZq_o2zkRw6WgC-kyPLq1ii6_ig&s=10',
    link: 'https://www.netflix.com/kh/title/60034571',
  },
  {
    id: 7,
    title: 'Thrash',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXLE9zmWXHJifwJ8wQBddNY2eZDEuHi3APWcB55YgtA&s=10',
    link: 'https://www.netflix.com/kh/title/82650122',
  },
  {
    id: 8,
    title: 'Spider Man Homecomming',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFn5DBQ_y_TTMuojKTu-BRbCuvYm9XdjTxOpGgR3Obw&s=10',
    link: 'https://www.netflix.com/kh/title/80166369',
  },
]
const popularMovies = [
  {
    id: 9,
    title: 'Barbie in The Nutcracker',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJF7-5xEW84_snu7mm0HTOt4IbBE8KJnUHfffjrYG17u9sZDzAXV1HADw&s=10',
    link: 'https://www.netflix.com/kh/title/60020996',
  },
  {
    id: 10,
    title: 'Rampage',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGeAIA3Y1WL9gyiaCWmjwnLwDHJlM0Y_KGddW4TCrXtw&s=10',
    link: 'https://www.netflix.com/kh/title/80216309',
  },
  {
    id: 11,
    title: 'The Wild Robot',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbsqD2R24L3w8onGCobiZ4Zb2uG-9KyIMS9Aa3ey6V9w&s=10',
    link: 'https://www.netflix.com/kh/title/81915938',
  },
  {
    id: 12,
    title: 'Alpha',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQlGUqLrK2thsEFKMYC0JWfdlbtEhQRv8jQwsOVAKHA&s',
    link: 'https://www.netflix.com/kh/title/82023350',
  },
  {
    id: 13,
    title: 'demon slayer kimetsu no yaiba infinity castle I',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREizT78LAAb3XMSfopzFs7yZyHT8sE02yYtswmmiJxaA&s=10',
    link: 'https://www.netflix.com/kh/title/82723106',
  },
  {
    id: 14,
    title: 'Tarung:unforgiven',
    image:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABescRT72Dg0ROTJ8HK2_Ylve1v5oRYfLsv3nMvbdWC90xsZWttoGWTb3_8Toid5aRw-zT-2mnzsxoV0tPgZZ2MCIDaTDsK7vUhol.jpg?r=c49',
    link: 'https://www.netflix.com/kh/title/83054979',
  },
  {
    id: 15,
    title: 'Vishwanath & Sons',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdViK0BJyT0Wh89qY1ujzxzMcHmbpyuVHHbCA33GHrQ&s=10',
    link: 'https://www.netflix.com/kh/title/82034837',
  },
  {
    id: 16,
    title: 'PEAKY',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3EAplfuj_eXS0RajACqkI9ztB4fm3QxSOSM0BbSVI_A&s=10',
    link: 'https://www.netflix.com/kh/title/81319485',
  },
  {
    id: 17,
    title: 'Anora',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf52VyXF8nxqBsinrS6yIBJTpq5TNSgUEw2mXzsw9fYQ&s',
    link: 'https://www.netflix.com/kh/title/81952362',
  },
  {
    id: 18,
    title: 'KaratnKid:Legends',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREE5XvF_1wphn1yWX25c8oqhc3gIxYPrAzFPSuV-TEsg&s=10',
    link: 'https://www.netflix.com/kh/title/82064961',
  },
]
const trendingMovies = [
  {
    id: 19,
    title: 'The last House',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSytB315BWu4iZ78GDeLezAXdUk1Nh4jz_Hq7EqxedG6w&s=10',
    link: 'https://www.netflix.com/kh/title/81914143',
  },
  {
    id: 20,
    title: 'Love Untangled',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwhEo6idRaN4uN7gxm72eJesGa1IMpaAbh5qcqkBllg&s=10',
    link: 'https://www.netflix.com/kh/title/81785333',
  },
  {
    id: 21,
    title: 'Alas Roban',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40KIyaqo-Q1gB6dk1zf_4YuU3NzY3T4KP8_WqS1809w&s=10',
    link: 'https://www.netflix.com/kh/title/82136278',
  },
  {
    id: 22,
    title: 'Gladirtor II',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nGDQ76XJdqhFPomjOMCaPQ6nvpm11JLMrc2KzZELXQ&s=10',
    link: 'https://www.netflix.com/kh/title/81902148',
  },
  {
    id: 23,
    title: 'THE Rip',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9iJXZWr-TVBtu9ry2tJHTacZ9eg5yN6HtEnWU5U4SQ&s',
    link: 'https://www.netflix.com/kh/title/81915745',
  },
  {
    id: 24,
    title: 'Mortal Kombat',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjZED0ZL27V_v8rLKamwKfPzUAA0BH8suXmkrkVKCJ8g&s=10',
    link: 'https://www.netflix.com/kh/title/81267307',
  },
  {
    id: 25,
    title: 'The Debt Collector',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStXQhCz40FDky9h-mkXtrgaPGpGYURCda6yJGBQhbyDg&s=10',
    link: 'https://www.netflix.com/kh/title/81786017',
  },
  {
    id: 26,
    title: 'Facing El Chapo',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSve0F4jo2zO5JT7gI0Fegcf6HC9cpLaGuhZWMrWD5gaA&s',
    link: 'https://www.netflix.com/kh/title/82048151',
  },
  {
    id: 27,
    title: 'Warcraft',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRo1hmNwrUlG16j9zf8LryOmuAqWctKmkCmCq1GyGbg&s',
    link: 'https://www.netflix.com/kh/title/80093133',
  },
  {
    id: 28,
    title: 'Wicked',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9kkoOAB0n1h4F0sYTobBkzAsmTEs-D_42lxFnOI8jw&s=10',
    link: 'https://www.netflix.com/kh/title/82022339',
  },
]
</script>
<template>
  <div class="movies">
    <Navbar />

    <MoviRow title="Your Next Watch" :movies="movies" />

    <MoviRow title="Popular" :movies="popularMovies" />

    <MoviRow title="Trending Now" :movies="trendingMovies" />

    <crat />
  </div>
</template>

<style scoped>
.movies {
  min-height: 100vh;
  background: black;
}
</style>
