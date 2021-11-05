import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import IWorkoutData from '../types/Workout'
import WorkoutCard from '../components/WorkoutCard'
import { WorkoutService } from '../services/WorkoutService'

function Home() {
  const [workouts, setWorkouts] = useState<Array<IWorkoutData>>([]);

  useEffect(() => {
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    WorkoutService.getAll().then((res: any) => {
      setWorkouts(res.data.workouts)
    })
  }

  const history = useHistory()
  const routeNewWorkout = (id: string) => {
    history.push('/workouts/' + id)
  }

  const startNewWorkout = () => {
    WorkoutService.createWorkout().then(({ data }: any) => {
      routeNewWorkout(data.workout.id)
    })
  }

  const Workouts = () => {
    return (
      <div>
        <h5>In progress Workouts</h5>
        <ul className="list-group">
          {workouts &&
            workouts.filter((workout) => workout.in_progress).map((workout, index) => (
              <li
                key={index}
              >
                <WorkoutCard {...workout} />
              </li>
            ))}
        </ul>
      </div>
    )
  }

  const NoWorkouts = () => {
    return (
      <div>
        <p>You have no workouts in progress</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Home</h3>
      {
        workouts && workouts.length ?
          <Workouts />
          :
          <NoWorkouts />
      }
      <Button onClick={() => startNewWorkout()}>Start New Workout</Button>
    </div>
  )
}

export default Home
