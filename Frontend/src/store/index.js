import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth.js';
import groupReducer from './group.js';
import chatReducer from './chat.js';

export default configureStore({
    reducer: {
        authReducer,
        chatReducer,
        groupReducer
    }
});