import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { AuthProvider } from './AuthContext'
import Routes from './Routes'
import Navigation from './components/Navigation'

function App() {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Container className="d-flex justify-content-center">
          <Router>
            <Switch>
              <Routes />
            </Switch>
          </Router>
        </Container>
      </AuthProvider>
    </div>
  )
}

export default App

