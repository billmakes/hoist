import { useReducer } from "react"
import { useParams, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ExerciseService, ExerciseOptions } from '../services/ExerciseService'

type ActionType = {
  type: string,
  payload: any,
}

function reducer(state: ExerciseOptions, action: ActionType) {
  switch (action.type) {
    case 'setWeight':
      return { ...state, weight: action.payload }
    case 'setSets':
      return { ...state, sets: action.payload }
    case 'setLabel':
      return { ...state, label: action.payload }
    default:
      throw new Error()
  }
}

function AddExercise() {
  const initialState = { weight: 45, sets: 3, label: "" }
  const [formState, dispatch] = useReducer(reducer, initialState)

  const { id } = useParams<{ id: string }>()

  const history = useHistory()
  const routeWorkout = () => {
    history.push('/workouts/' + id)
  }

  const addExercise = () => {
    ExerciseService.create(id, formState).then(() => {
      routeWorkout()
    })
  }

  return (
    <div>
      <Card style={{ width: '100%', marginBottom: '0.5rem' }}>
        <Card.Header>
          Add an exercise
        </Card.Header>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" value={formState.label} onChange={e => dispatch({ type: 'setLabel', payload: e.target.value })} />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button variant="danger" style={{ width: '45px', height: '45px' }} onClick={() => dispatch({ type: 'setWeight', payload: formState.weight - 5 })}>-</Button>
          <strong>Weight: {formState.weight}</strong>
          <Button variant="success" style={{ width: '45px', height: '45px' }} onClick={() => dispatch({ type: 'setWeight', payload: formState.weight + 5 })}>+</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="danger" style={{ width: '45px', height: '45px' }} onClick={() => dispatch({ type: 'setSets', payload: formState.sets - 1 })}>-</Button>
          <strong>Sets: {formState.sets}</strong>
          <Button variant="success" style={{ width: '45px', height: '45px' }} onClick={() => dispatch({ type: 'setSets', payload: formState.sets + 1 })}>+</Button>
        </div>
      </Card>

      <div className="d-flex justify-content-between">
        <Button variant="secondary">Cancel</Button>
        <Button variant="dark" onClick={() => addExercise()}>Add Exercise</Button>
      </div>
    </div>
  )
}

export default AddExercise
