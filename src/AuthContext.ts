import { createContext } from 'react'

const authContext = createContext({
  auth: false,
  login: () => { },
  logout: () => { },
})

export default authContext
