import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        AI: null,
        isLoggedIn: false
    },
    reducers: {
        updateLoginState: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.AI = action.payload.AI;
        },
        updateLogoutState: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.AI = null;
            localStorage.removeItem('token');
        },
        changeUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { updateLoginState, updateLogoutState, changeUser } = authSlice.actions;

export default authSlice.reducer;