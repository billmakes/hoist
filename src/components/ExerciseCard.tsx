import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ExerciseService } from '../services/ExerciseService'
import IExerciseData from '../types/Exercise'

function ExerciseCard(props: IExerciseData) {
  const [counter, setCounter] = useState(0)
  const [weight, setWeight] = useState(props.weight)
  const [setsNumber, setSetsNumber] = useState(props.sets)
  const [label, setExerciseLabel] = useState(props.label)
  const [editing, setEditing] = useState(false)

  type setDataType = { checked: boolean, key: string }

  const setsData: setDataType[] = []

  for (let i = 0; i < setsNumber; i++) {
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

  const CardBody = () => {
    return (
      <div>
        <strong>
          Weight:
        </strong>
        {weight}
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

  const { id } = useParams<{ id: string }>()

  const updateExercise = (params: { label: string, weight: number, sets: number }) => {
    ExerciseService.update(id, props.id, params)
  }

  const editHandler = () => {
    setEditing(!editing)
    if (editing) {
      // Update exercise
      updateExercise({ label, weight, sets: setsNumber })
    }
  }
  const CardBodyEditing = () => {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control type="input" value={label} onChange={e => setExerciseLabel(e.target.value)} />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button variant="danger" style={{ width: '45px', height: '45px' }} onClick={() => { setWeight(weight - 5) }}>-</Button>
          <strong>Weight: {weight}</strong>
          <Button variant="success" style={{ width: '45px', height: '45px' }} onClick={() => { setWeight(weight + 5) }}>+</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="danger" style={{ width: '45px', height: '45px' }} onClick={() => { setSetsNumber(setsNumber - 1) }}>-</Button>
          <strong>Sets: {setsNumber}</strong>
          <Button variant="success" style={{ width: '45px', height: '45px' }} onClick={() => { setSetsNumber(setsNumber + 1) }}>+</Button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (setsNumber) {
      setCounter(0)
      console.log('sets number')
    }
  }, [setsNumber])

  return (
    <Card style={{ width: '100%', marginBottom: '0.5rem' }}>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {label}
          </div>
          <Button
            onClick={editHandler}
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
