import axios from "axios"
import { LocalStorageService } from './services/LocalStorageService'

const http = axios.create({
  baseURL: "http://localhost:4000/v1",
  headers: {
    "Content-Type": "application/json",
  }
})

const token = LocalStorageService.getAccessToken()

if (token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


export default http
