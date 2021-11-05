import { useState, useEffect, useContext } from "react"
import { WorkoutService } from '../services/WorkoutService'
import IWorkoutData from '../types/Workout'
import WorkoutCard from '../components/WorkoutCard'
import WorkoutsContext from '../WorkoutsContext'

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Array<IWorkoutData>>([]);
  const workoutsContext = useContext(WorkoutsContext)

  useEffect(() => {
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    if (workoutsContext.workouts.length) {
      console.log(workoutsContext.workouts, 'length')
    }
    WorkoutService.getAll().then((res: any) => {
      workoutsContext.workouts = res.data.workouts
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
