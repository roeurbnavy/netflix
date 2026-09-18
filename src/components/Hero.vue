<script>
export default {
  data() {
    return {
      email: '',
      emailError: false,
    }
  },

  methods: {
    joinNow() {
      if (this.email.trim() === '') {
        this.emailError = true
        return
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailPattern.test(this.email)) {
        this.emailError = true
        return
      }

      this.emailError = false

      alert('Welcome! Registration can continue.')
    },
  },
}
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h2>Movies</h2>

      <p>
        Movies move us like nothing else can, whether they're scary, funny,
        <br />
        dramatic, romantic or anywhere in-between. So many titles, so much to experience.
      </p>

      <div class="input-area">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            :class="{ 'input-error': emailError }"
          />

          <p v-if="emailError" class="error-message">
            <span class="error-icon"></span>
            Email is required.
          </p>
        </div>

        <button @click="joinNow">Join Now</button>
      </div>

      <p class="price">Endless entertainment starting at USD 2.99</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 106px);
  margin: 0 40px;
  background-image:
    linear-gradient(to top, black, transparent),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/371f6a2f-67f2-415e-9629-d8a97f270bee/web_tall_panel/KH-en-20260901-TRIFECTA-perspective_4e770b21-9ae9-4ea1-911d-1dec9173dd36_large.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  border: 1px solid gray;
  display: flex;
  align-items: flex-end;
  padding: 45px;
}

.hero-content {
  color: white;
}

.hero h2 {
  font-size: 40px;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.hero-content > p {
  font-size: 20px;
  line-height: 1.4;
  font-family: Arial, Helvetica, sans-serif;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-top: 35px;
}

.input-area input {
  width: 350px;
  height: 50px;
  padding: 18px;
  font-size: 14px;
  border: 1px solid white;
  border-radius: 20px;
  outline: none;
  background: black;
  color: white;
}

.input-area input.error {
  border: 2px solid red;
  background: black;
  color: white;
}

.input-area button {
  width: 200px;
  height: 50px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.input-area button:hover {
  background: #b20710;
}

.price {
  margin-top: 5px;
}

@media (max-width: 600px) {
  .hero {
    margin: 0 15px;
    padding: 25px;
  }

  .hero h2 {
    font-size: 42px;
  }

  .hero-content > p {
    font-size: 16px;
  }

  .hero-content br {
    display: none;
  }

  .input-area {
    flex-direction: column;
    width: 100%;
  }

  .input-area input,
  .input-area button {
    width: 100%;
  }
}
.error-message {
  color: #e50914;
  font-size: 15px;
  padding: 20px;
}
.error-icon {
  margin-right: 10px;
}
</style>
