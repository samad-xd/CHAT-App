import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChat: null,
        chats: [],
        activeUsers: []
    },
    reducers: {
        changeSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        changeChats: (state, action) => {
            state.chats = action.payload;
        },
        changeActiveUsers: (state, action) => {
            state.activeUsers = action.payload;
        },
        resetChatState: (state) => {
            state.selectedChat = null;
            state.chats = [],
            state.activeUsers = []
        }
    }
});

export const { changeSelectedChat, changeChats, changeActiveUsers, resetChatState } = chatSlice.actions;

export default chatSlice.reducer;