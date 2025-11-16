import type { AuthUser, result } from '@/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: AuthUser | null
  token: string | null
  login: (username: string, password: string) => Promise<result>
  register: (name: string, password: string) => Promise<result>
  logout: () => void
  isTokenExpired: (token: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (name, password) => {
        const resp = await fetch('http://localhost:3002/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, password }),
        })
        if (!resp.ok) throw new Error('Login failed')
        const data: { user: AuthUser; token: string; ok: boolean } =
          await resp.json()
        set({ user: data.user, token: data.token })
        return data
      },
      register: async (name, password) => {
        const resp = await fetch('http://localhost:3002/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, password }),
        })
        if (!resp.ok) throw new Error('Register failed')
        const data: { user: AuthUser; token: string } = await resp.json()
        set({ user: data.user, token: data.token })
        return (await resp.json()) as result
      },
      logout: () => set({ user: null, token: null }),
      isTokenExpired: (token: string) => {
        try {
          const [, payloadBase64] = token.split('.')
          const payloadJson = atob(
            payloadBase64.replace(/-/g, '+').replace(/_/g, '/'),
          )
          const payload = JSON.parse(payloadJson)

          if (!payload.exp) return true
          const now = Math.floor(Date.now() / 1000)

          return payload.exp < now
        } catch (e) {
          console.error('Invalid token', e)
          return true
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
)
