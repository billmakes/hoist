import http from "../http-common"
import { LocalStorageService } from './LocalStorageService'

const login_endpoint = 'tokens/authentication'

const login = (params: { email: string, password: string }) => {
  return http.post(login_endpoint, params).then(({ data }: any) => {
    LocalStorageService.setToken(data.authentication_token)
    http.defaults.headers.common['Authorization'] = `Bearer ${data.authentication_token.token}`
  })
}

const logout = () => {
  LocalStorageService.clearToken()
}

export const AuthService = {
  login,
  logout,
}
