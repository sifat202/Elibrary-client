import axios from "axios";


// Create a configured instance of axios
const api = axios.create({
  baseURL: 'https://elibrary-server-3y49-7rhh0bq9v-shifat-ahmeds-projects-b2b7efe5.vercel.app', // Your centralized base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;