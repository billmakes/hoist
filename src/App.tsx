import React, { useState } from "react"
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Login, WorkoutDetails, Workouts, AddExercise, ConfirmDeleteExercise } from './views'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LocalStorageService } from './services/LocalStorageService'
import http from './http-common'
import AuthContext from './AuthContext'

const token = LocalStorageService.getAccessToken()

function App() {
  const [auth, setAuth] = useState(!!token)

  function LoginLogout() {
    if (auth) {
      return <Nav.Link onClick={logout} href="#login">Logout</Nav.Link>
    } else {
      return <Nav.Link href="#login">Login</Nav.Link>
    }
  }

  function login() {
    setAuth(true)
    console.log(auth, 'login')
  }

  function logout() {
    LocalStorageService.clearToken()
    delete http.defaults.headers.common['Authorization']
    setAuth(false)
  }

  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ auth: auth, logout, login }}>
          <Navbar bg="primary" variant="dark" className="mb-3">
            <Container>
              {auth ? 'Logged in' : 'not logged in'}
              <Navbar.Brand href="#/">Hoist</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#/">Home</Nav.Link>
                <LoginLogout />
                <Nav.Link href="#workouts">Workouts</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container className="d-flex justify-content-center">
            <React.Fragment>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/workouts" component={Workouts} />
                <Route path="/workouts/:id/exercise/:exercise_id/confirm" component={ConfirmDeleteExercise} />
                <Route path="/workouts/:id/exercise" component={AddExercise} />
                <Route path="/workouts/:id" component={WorkoutDetails} />
              </Switch>
            </React.Fragment>
          </Container>
        </AuthContext.Provider>
      </Router>
    </div >
  )
}

export default App

