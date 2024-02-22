import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({ baseURL: `${process.env.BACKEND_URL}/chat` });

export async function getAllFriendsData() {
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

export async function fetchChatData(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/${id}`);
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

export async function fetchMessages(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/message/${id}`);
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

export async function sendMessage(messageData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/message/send', messageData);
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

export async function getAImesssage(messageData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/message/send/AI', messageData);
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