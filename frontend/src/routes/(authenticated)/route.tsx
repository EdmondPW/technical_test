// src/routes/(authenticated)/route.tsx
import { useAuthStore } from '@/state/auth.state'
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)')({
  beforeLoad: () => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({ to: '/', search: { redirect: location.href } })
    }

    const isTokenExpire = useAuthStore.getState().isTokenExpired

    if (!token || isTokenExpire(token)) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      })
    }
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
