import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this to your backend URL in production
});

export default instance;
