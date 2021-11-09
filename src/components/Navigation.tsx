import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from '../AuthContext'

function LoginLogout() {
  const {
    state: { auth },
    dispatch,
  } = useAuth()

  if (auth) {
    return <Nav.Link href="login" onClick={() => dispatch({ type: 'logout' })}>Logout</Nav.Link>
  } else {
    return <Nav.Link href="login">Login</Nav.Link>
  }
}

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Navbar.Brand href="/">Hoist</Navbar.Brand>
      <Nav className="me-auto d-flex justify-content-between">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/workouts">Workouts</Nav.Link>
        <LoginLogout />
      </Nav>
    </Navbar>
  )
}

export default Navigation
