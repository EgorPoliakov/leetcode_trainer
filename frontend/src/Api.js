import axios from 'axios'

const configHeaders = {
    'content-type': 'application/json',
    'Accept': 'application/json'
};

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: configHeaders
});

export default api;