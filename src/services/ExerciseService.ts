import http from "../http-common"
import IExerciseData from '../types/Exercise'

const endpoint = (workout_id: string) => `/workouts/${workout_id}/exercises`

const getAll = (workout_id: string) => {
  return http.get<Array<IExerciseData>>(`${endpoint(workout_id)}`)
}

const getOne = (workout_id: string, id: string) => {
  return http.get<IExerciseData>(`${endpoint(workout_id)}/${id}`)
}

const update = (workout_id: string, id: string, params: { weight: number, sets: number }) => {
  return http.patch<IExerciseData>(`${endpoint(workout_id)}/${id}`, params)
}

export const ExerciseService = {
  getAll,
  getOne,
  update,
}
