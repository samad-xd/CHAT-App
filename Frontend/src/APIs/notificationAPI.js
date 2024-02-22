import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({ baseURL: `${process.env.BACKEND_URL}/chat` });

export async function sendNotification(notification) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/send', notification);
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

export async function readNotification(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/read/${id}`);
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

export async function getAllNotifications() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/all');
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