import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  email: string
  password?: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<boolean>(localStorage.getItem('isLoggedIn') === 'true')
  const currentUser = ref<User | null>(
    localStorage.getItem('userEmail')
      ? { email: localStorage.getItem('userEmail') || '' }
      : null,
  )
  const isAuthModalOpen = ref<boolean>(false)

  function login(email: string, _password?: string) {
    isLoggedIn.value = true
    currentUser.value = { email }
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    closeAuthModal()
  }

  function logout() {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
  }

  function openAuthModal() {
    isAuthModalOpen.value = true
  }

  function closeAuthModal() {
    isAuthModalOpen.value = false
  }

  return {
    isLoggedIn,
    currentUser,
    isAuthModalOpen,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
  }
})
