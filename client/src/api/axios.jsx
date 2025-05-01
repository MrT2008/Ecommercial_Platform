import axios from 'axios';

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


