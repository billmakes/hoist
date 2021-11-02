import http from "../http-common"
import IWorkoutData from "../types/Workout"

const endpoint = "/workouts"

const getAll = () => {
  return http.get<Array<IWorkoutData>>(`${endpoint}`)
}

const getOne = (id: string) => {
  return http.get<IWorkoutData>(`${endpoint}/${id}`)
}

export const WorkoutService = {
  getAll,
  getOne,
}
