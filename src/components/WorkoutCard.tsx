import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import IWorkoutData from '../types/Workout'

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
        <div>
          <Button variant="dark" onClick={() => routeDetails(props.id)}>Details</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default WorkoutCard
