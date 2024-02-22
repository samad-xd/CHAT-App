import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export async function signup(signupData) {
    try {
        const response = await API.post('/signup', signupData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return {
            status: response.status,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        };
    }
}

export async function login(loginData) {
    try {
        const response = await API.post('/login', loginData);
        return {
            status: response.status,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        };
    }
}

export async function verifyTokenData() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/auth');
        console.log(response);
        return response.data;
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        };
    }
}