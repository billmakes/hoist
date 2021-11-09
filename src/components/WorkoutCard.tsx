import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'

function WorkoutCard(props: IWorkoutData) {
  const history = useHistory()
  const routeDetails = (id: string) => {
    history.push(`/workouts/${id}`)
  }

  return (
    <Card style={{ width: '18rem', margin: '0.5rem' }}>
      <Card.Header>
        Workout
      </Card.Header>
      <Card.Body>
        {new Date(props.created_at).toLocaleDateString()}
        {props.id}
        {props.in_progress ? 'in progress' : 'not started'}
        <ul>
          {props.exercises && props.exercises.map((exercise: IExerciseData) => (
            <li key={exercise.id}>{exercise.label}</li>
          ))}
        </ul>
        <div>
          <Button variant="dark" onClick={() => routeDetails(props.id)}>Details</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default WorkoutCard
