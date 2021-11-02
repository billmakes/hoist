import axios from "axios"

export default axios.create({
  baseURL: "http://localhost:4000/v1",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer F7OJCE3G5NMDT5LFE7R3B7BVPI",
  }
})
