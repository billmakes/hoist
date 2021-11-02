const setToken = (tokenObj: { token: string, expiry: string }) => {
  localStorage.setItem('access_token', tokenObj.token)
  localStorage.setItem('expiry', tokenObj.expiry)
}

const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

const getTokenExpiry = () => {
  return localStorage.getItem('expiry')
}

const clearToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('expiry')
}

export const LocalStorageService = {
  setToken,
  getAccessToken,
  getTokenExpiry,
  clearToken,
}
