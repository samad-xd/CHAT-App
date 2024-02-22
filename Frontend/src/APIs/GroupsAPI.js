import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({ baseURL: `${process.env.BACKEND_URL}/chat` });

export async function getAllGroupsData() {
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

export async function createGroup(groupData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/create', groupData, {
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

export async function fetchGroupMessages(id) {
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

export async function sendGroupMessage(messageData) {
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

export async function removeFromGroup(groupId, userId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/remove/${groupId}/${userId}`);
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

export async function addToGroup(groupId, userId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/add/${groupId}/${userId}`);
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

export async function deleteGroup(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/delete/${groupId}`);
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

export async function fetchGroupMembers(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/members/${groupId}`);
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

export async function fetchMembersNotInGroup(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/friends/${groupId}`);
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

export async function updateGroupName(groupId, data) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post(`/update/name/${groupId}`, data);
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

export async function updateGroupImage(groupId, data) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post(`/update/image/${groupId}`, data, {
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