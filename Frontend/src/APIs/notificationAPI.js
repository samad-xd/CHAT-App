import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:3000/notification'});

export async function sendNotification(notification) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/send', notification);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function readNotification(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/read/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllNotifications() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/all');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}