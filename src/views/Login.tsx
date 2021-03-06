import { useState } from "react"
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthService } from '../services/AuthService'
import { useAuth, AuthProvider } from '../AuthContext'

function Login() {
  const { dispatch } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLoginError, setShowLoginError] = useState(false)

  const history = useHistory()
  const routeHome = () => {
    history.push('/workouts')
  }

  const submit = () => {
    AuthService.login({ email, password }).then(() => {
      dispatch({ type: 'login' })
      routeHome()
    }).catch((e) => {
      console.error(e)
      setShowLoginError(true)
    })
  }

  return (
    <div>
      <AuthProvider>
        {showLoginError ? <Alert className="w-100" variant="danger">Error</Alert> : null}
        <h5>Login</h5>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={submit}>
            Login
          </Button>
        </Form>
      </AuthProvider>
    </div >
  )
}

export default Login
