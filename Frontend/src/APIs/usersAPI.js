import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export async function findFriends(name) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/find/${name}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllFriendRequests() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/requests/all');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/add/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function acceptFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/accept/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function rejectFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/reject/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function cancelFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFriend(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/remove/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserProfile(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/profile/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getBlockedUsers() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/blocked');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function blockUser(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/block/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function unblockUser(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/unblock/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateName(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/name', body);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePassword(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/password', body);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateProfilePicture(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/picture', body, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteAccount() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/delete/account');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}