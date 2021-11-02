import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Login, WorkoutDetails, Workouts } from './views'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/workouts">My Workouts</Link>
        </nav>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/workouts" component={Workouts} />
          <Route path="/workouts/:id" component={WorkoutDetails} />
        </Switch>
      </div>
    </Router>
  )
}
export default App

