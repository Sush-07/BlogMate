
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setAuthData({ token, user }) {
      this.token = token
      this.user = user
      localStorage.setItem("token",token);
    },
    clearAuthData() {
      this.token = null
      this.user = null
      localStorage.removeItem("token");
    },
  },
})
