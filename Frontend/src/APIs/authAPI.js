import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export async function signup(signupData) {
    try {
        const response = await API.post('/signup', signupData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function login(loginData) {
    try {
        const response = await API.post('/login', loginData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function verifyTokenData(token) {
    API.defaults.headers.common['Authorization'] = token;
    try {
        const response = await API.get('/auth');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}