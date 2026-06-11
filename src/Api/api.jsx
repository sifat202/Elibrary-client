import axios from "axios";

// Create a configured instance of axios
const api = axios.create({
  // baseURL: 'http://localhost:5000', 
   baseURL: 'https://elibrary-server-3y49-7rhh0bq9v-shifat-ahmeds-projects-b2b7efe5.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout is set in milliseconds. 
  // 15000ms = 15 seconds. Give your slow laptop plenty of time to respond!
  timeout: 35000, 
});

export default api;
//http://localhost:5000
//https://elibrary-server-3y49-7rhh0bq9v-shifat-ahmeds-projects-b2b7efe5.vercel.app