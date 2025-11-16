export interface AuthUser {
  id: string
  name: string
  role: number
}

export interface AuthContextType {
  user: AuthUser
  token: string
}

export interface result {
  ok: boolean
  user?: object | undefined
  token?: string | undefined
  error?: string | undefined
}
