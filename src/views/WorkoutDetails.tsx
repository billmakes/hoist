import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { WorkoutService } from '../services/WorkoutService'
import { ExerciseService } from '../services/ExerciseService'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'
import ExerciseCard from '../components/ExerciseCard'
import { useParams } from 'react-router-dom'

function WorkoutDetails() {
  const { id } = useParams<{ id: string }>()
  const [workout, setWorkout] = useState<IWorkoutData>()
  const [exercises, setExercises] = useState<Array<IExerciseData>>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getWorkout()
    getExercises()
  }

  const getWorkout = () => {
    WorkoutService.getOne(id).then((res: any) => {
      console.log(res.data)
      setWorkout(res.data.workout)
      return res.data.workout
    })
  }

  const getExercises = () => {
    ExerciseService.getAll(id).then((res: any) => {
      console.log(res.data)
      setExercises(res.data.exercises)
      return res.data.exercises
    })
  }

  const updateWorkout = () => {
    if (workout.in_progress) {
      WorkoutService.completeWorkout(id).then(() => {
        setWorkout({ ...workout, in_progress: !workout.in_progress })
        routeWorkouts()
      })
    } else {
      WorkoutService.resumeWorkout(id).then(() => {
        setWorkout({ ...workout, in_progress: !workout.in_progress })
      })
    }
  }

  const history = useHistory()
  const routeWorkouts = () => {
    history.push('/workouts')
  }

  const routeAddExercise = () => {
    history.push(`/workouts/${id}/exercise`)
  }

  const deleteWorkout = () => {
    WorkoutService.deleteWorkout(id).then(() => {
      routeWorkouts()
    })
  }

  if (workout) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>
            {new Date(workout.created_at).toLocaleDateString()}
          </h5>
          <h5>
            {workout.in_progress ? 'IN PROGRESS' : 'NOT STARTED'}
          </h5>
          <Button variant="dark" onClick={routeAddExercise}>Add Exercise</Button>
        </div>
        <ul className="list-group">
          {exercises &&
            exercises.map((exercise, index) => (
              <li
                key={index}
              >
                <ExerciseCard {...exercise} />
              </li>
            ))}
        </ul>
        <div className="d-flex justify-content-center">
          <Button className="m-3" variant="danger" onClick={() => deleteWorkout()}>Delete workout</Button>
          <Button variant="dark" className="m-3" onClick={updateWorkout}>{workout.in_progress ? 'Finish Workout' : 'Resume Workout'}</Button>
        </div>
      </div>
    )
  } else {
    return <h1>Error</h1>
  }
}

export default WorkoutDetails
