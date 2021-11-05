import { useParams, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { ExerciseService } from '../services/ExerciseService'

function ConfirmDeleteExercise() {
  const { id } = useParams<{ id: string }>()
  const { exercise_id } = useParams<{ exercise_id: string }>()

  const history = useHistory()
  const routeWorkout = () => {
    history.push('/workouts/' + id)
  }

  const deleteExercise = () => {
    ExerciseService.deleteExercise(id, exercise_id).then(() => {
      routeWorkout()
    })
  }

  return (
    <div>
      <Card style={{ width: '100%', marginBottom: '0.5rem' }}>
        <Card.Header>
          Are you sure you want to remove this exercise?
        </Card.Header>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => routeWorkout()}>Cancel</Button>
          <Button onClick={() => deleteExercise()}>Remove</Button>
        </div>
      </Card>

    </div>
  )
}

export default ConfirmDeleteExercise
