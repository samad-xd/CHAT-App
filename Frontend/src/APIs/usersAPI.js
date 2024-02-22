import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export async function findFriends(name) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/find/${name}`);
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

export async function getAllFriendRequests() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/requests/all');
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

export async function sendFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/add/${id}`);
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

export async function acceptFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/accept/${id}`);
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

export async function rejectFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/reject/${id}`);
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

export async function cancelFriendRequest(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/cancel/${id}`);
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

export async function removeFriend(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/remove/${id}`);
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

export async function getUserProfile(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/profile/${id}`);
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

export async function getBlockedUsers() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/blocked');
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

export async function blockUser(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/block/${id}`);
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

export async function unblockUser(id) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get(`/unblock/${id}`);
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

export async function updateName(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/name', body);
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

export async function updatePassword(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/password', body);
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

export async function updateProfilePicture(body) {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.post('/update/picture', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

export async function deleteAccount() {
    API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
        const response = await API.get('/delete/account');
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