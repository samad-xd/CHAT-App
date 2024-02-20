import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:3000/chat'});

export async function getAllFriendsData() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/all');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChatData(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchMessages(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/message/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendMessage(messageData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/message/send', messageData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAImesssage(messageData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/message/send/AI', messageData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}