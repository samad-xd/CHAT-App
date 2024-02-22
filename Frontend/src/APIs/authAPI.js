import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({ baseURL: process.env.BACKEND_URL });

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

export async function verifyTokenData(token) {
    API.defaults.headers.common['Authorization'] = token;
    try {
        const response = await API.get('/auth');
        return response.data;
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        };
    }
}