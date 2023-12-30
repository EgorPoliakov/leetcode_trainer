import axios from 'axios'
import constants from './constants';
axios.defaults.withCredentials = true

const configHeaders = {
    'content-type': 'application/json',
    'Accept': 'application/json'
};

const api = axios.create({
    baseURL: constants.endpoints.domain,
    // headers: configHeaders
});

export default api;