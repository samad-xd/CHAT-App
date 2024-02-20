import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/group' });

export async function getAllGroupsData() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/all');
        return response.data;
    } catch (error) {
        console.log(error);
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
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchGroupMessages(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/message/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendGroupMessage(messageData) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/message/send', messageData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromGroup(groupId, userId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/remove/${groupId}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addToGroup(groupId, userId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/add/${groupId}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteGroup(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/delete/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchGroupMembers(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/members/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchMembersNotInGroup(groupId) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/friends/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateGroupName(groupId, data) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post(`/update/name/${groupId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
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
        return response.data;
    } catch (error) {
        console.log(error);
    }
}