import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';
import filesReducer from './filesReducer';


const store = configureStore({
    reducer: {
        users: usersReducer,
        files: filesReducer,
    }
})

export default store