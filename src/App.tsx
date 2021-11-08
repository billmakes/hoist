import React, { useState } from "react"
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Routes from './Routes'
import { LocalStorageService } from './services/LocalStorageService'
import http from './http-common'
import AuthContext from './AuthContext'

const token = LocalStorageService.getAccessToken()

function App() {
  const [auth, setAuth] = useState(!!token)

  function LoginLogout() {
    if (auth) {
      return <Nav.Link onClick={logout} href="login">Logout</Nav.Link>
    } else {
      return <Nav.Link href="login">Login</Nav.Link>
    }
  }

  function login() {
    setAuth(true)
  }

  function logout() {
    LocalStorageService.clearToken()
    delete http.defaults.headers.common['Authorization']
    setAuth(false)
  }

  return (
    <div>
      <AuthContext.Provider value={{ auth: auth, logout, login }}>
        <Navbar bg="dark" variant="dark" className="mb-3">
          <Navbar.Brand href="/">Hoist</Navbar.Brand>
          <Nav className="me-auto d-flex justify-content-between">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/workouts">Workouts</Nav.Link>
            <LoginLogout />
          </Nav>
        </Navbar>
        <Container className="d-flex justify-content-center">
          <React.Fragment>
            <Router>
              <Switch>
                <Routes />
              </Switch>
            </Router>
          </React.Fragment>
        </Container>
      </AuthContext.Provider>
    </div >
  )
}

export default App

