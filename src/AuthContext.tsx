import { createContext, useContext, useReducer } from 'react'
import http from './http-common'
import { LocalStorageService } from './services/LocalStorageService'


type Action = { type: 'login' } | { type: 'logout' }
type Dispatch = (action: Action) => void
type State = { auth: boolean }
type AuthProviderProps = { children: React.ReactNode }


const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)


function authReducer(_state: State, action: Action) {
  switch (action.type || null) {
    case 'login': {
      return { auth: true }
    }
    case 'logout': {
      LocalStorageService.clearToken()
      delete http.defaults.headers.common['Authorization']
      return { auth: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const token = LocalStorageService.getAccessToken()
  const [state, dispatch] = useReducer(authReducer, { auth: !!token })
  const value = { state, dispatch }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}


export { AuthProvider, useAuth }
