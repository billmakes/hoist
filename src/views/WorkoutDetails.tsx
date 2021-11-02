import { useState, useEffect } from "react"
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

  if (workout) {
    return (
      <div>
        <h1>Workout</h1>
        {workout.id}
        {workout.created_at}
        {workout.in_progress ? 'IN PROGRESS' : 'NOT STARTED'}
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
          <Button>{workout.in_progress ? 'Finish Workout' : 'Resume Workout'}</Button>
        </div>
      </div>
    )
  } else {
    return <h1>Error</h1>
  }
}

export default WorkoutDetails
