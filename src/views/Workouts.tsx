import { useState, useEffect } from "react"
import { WorkoutService } from '../services/WorkoutService'
import IWorkoutData from '../types/Workout'
import WorkoutCard from '../components/WorkoutCard'

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Array<IWorkoutData>>([]);
  useEffect(() => {
    console.log('mounted workouts')
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    WorkoutService.getAll().then((res: any) => {
      setWorkouts(res.data.workouts)
    })
  }

  return (
    <div>
      <h1>Workouts</h1>
      <ul className="list-group">
        {workouts &&
          workouts.map((workout, index) => (
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

export default Workouts
