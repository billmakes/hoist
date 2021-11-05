import { useState, useEffect, useReducer, useRef } from "react"
import { useParams, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ExerciseService, ExerciseOptions } from '../services/ExerciseService'
import IExerciseData from '../types/Exercise'

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

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function ExerciseCard(props: IExerciseData) {
  const [counter, setCounter] = useState(0)
  const [editing, setEditing] = useState(false)

  const initialState = { weight: props.weight, sets: props.sets, label: props.label };
  const [exerciseState, setExerciseState] = useState(initialState)
  const [formState, dispatch] = useReducer(reducer, initialState)

  type setDataType = { checked: boolean, key: string }

  const setsData: setDataType[] = []

  for (let i = 0; i < exerciseState.sets; i++) {
    setsData.push({ checked: false, key: 'set' + i })
  }

  function handleChange(e: any, set: any) {
    set.checked = !set.checked
    if (e.target.checked) {
      setCounter(counter + 1)
    } else {
      setCounter(counter - 1)
    }
  }

  const setsCompleted = () => {
    return counter === setsData.length
  }

  const { id } = useParams<{ id: string }>()

  const updateExercise = (params: Partial<ExerciseOptions>) => {
    ExerciseService.update(id, props.id, params)
  }


  const history = useHistory()
  const routeConfirmDelete = () => {
    history.push(`/workouts/${id}/exercise/${props.id}/confirm`)
  }
  const removeExercise = () => {
    routeConfirmDelete()
  }

  const params: Partial<ExerciseOptions> = {}

  const prevState: any = usePrevious(exerciseState)

  const editExerciseHandler = () => {
    setEditing(!editing)
    if (editing) {
      setCounter(0)
      setExerciseState(formState)
      if (formState.weight !== prevState.weight) params.weight = formState.weight
      if (formState.sets !== prevState.sets) params.sets = formState.sets
      if (formState.label !== prevState.label) params.label = formState.label
      if (Object.keys(params).length) {
        updateExercise(params)
      }
    }
  }

  const CardBodyEditing = () => {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Exercise Name</Form.Label>
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
        <Button className="mt-3" variant="danger" onClick={() => removeExercise()}>Remove Exericse</Button>
      </div>
    )
  }

  const CardBody = () => {
    return (
      <div>
        <strong>
          Weight:
        </strong>
        {exerciseState.weight}
        <div>
          {
            setsData.map((set) => (
              <input
                className="m-1 form-check-input"
                style={{ width: "45px", height: "45px" }}
                type="checkbox"
                key={set.key}
                onChange={(e) => handleChange(e, set)}
              />
            ))
          }
        </div>
        <div>
          {setsCompleted() ? 'ALL DONE' : 'not done yet'}
        </div>
      </div>
    )
  }

  return (
    <Card style={{ width: '100%', marginBottom: '0.5rem' }}>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {exerciseState.label}
          </div>
          <Button
            onClick={editExerciseHandler}
            variant={editing ? 'primary' : 'outline-secondary'}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {editing ? CardBodyEditing() : CardBody()}
      </Card.Body>
    </Card>
  )
}

export default ExerciseCard
