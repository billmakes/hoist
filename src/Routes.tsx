import { Route } from 'react-router-dom'
import { Home, Login, WorkoutDetails, Workouts, AddExercise, ConfirmDeleteExercise } from './views'

function Routes() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/workouts" component={Workouts} />
      <Route exact path="/workouts/:id/exercise" component={AddExercise} />
      <Route exact path="/workouts/:id" component={WorkoutDetails} />
      <Route exact path="/workouts/:id/exercise/:exercise_id/confirm" component={ConfirmDeleteExercise} />
    </>
  )
}

export default Routes
