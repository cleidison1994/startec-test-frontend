import axios from 'axios';
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const api  = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})
export default api;
