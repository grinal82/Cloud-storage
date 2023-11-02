import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCookie from "../common";

const cookies = document.cookie;
const cookieArray = cookies.split(';');
let sessionid = null

cookieArray.forEach(cookie => {
    if (cookie.includes('sessionid=')) {
        sessionid = cookie.split('=')[1];
    }
})

export const fetchRegisterUser = createAsyncThunk(
    'users/register', async({ username, email, password }) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        const data = await response.json()
        return data
    }
)

export const fetchLoginUser = createAsyncThunk(
    'users/login', async({ email, password }) => {
        const csrftoken = getCookie('csrftoken')
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ email, password, csrfmiddlewaretoken: csrftoken })
    })
    const data = await response.json()
    return data
    }
)

export const fetchLogoutUser = createAsyncThunk(
    'users/logout', async() => {
        const csrftoken = getCookie('csrftoken')
        const response = await fetch('http://127.0.0.1:8000/api/logout/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        })
        const data = await response.json()
        return data
    }
)


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [], 
        loading: false,
        error: null
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        }
    },
    extraReducers: {
        [fetchRegisterUser.pending]: (state, action) => {
            console.log('fetchRegisterUser pending', action)
            state.loading = true
        },
        [fetchRegisterUser.fulfilled]: (state, action) => {
            console.log('fetchRegisterUser fulfilled', action)
            state.loading = false
            state.error = null
            state.users = action.payload
        },
        [fetchRegisterUser.rejected]: (state, action) => {
            console.log('fetchRegisterUser rejected', action)
            state.loading = false
            state.error = action.error
        }, 
        [fetchLoginUser.pending]: (state, action) => {
            console.log('fetchLoginUser pending', action)
            state.loading = true
        },
        [fetchLoginUser.fulfilled]: (state, action) => {
            console.log('fetchLoginUser fulfilled', action)
            state.loading = false
            state.error = null
            state.users = action.payload
        },
        [fetchLoginUser.rejected]: (state, action) => {
            console.log('fetchLoginUser rejected', action)
            state.loading = false
            state.error = action.error
        }, 
        [fetchLogoutUser.pending]: (state, action) => {
            console.log('fetchLogoutUser pending', action)
            state.loading = true
        }, 
        [fetchLogoutUser.fulfilled]: (state, action) => {
            console.log('fetchLogoutUser fulfilled', action)
            state.loading = false
            state.error = null
        },
        [fetchLogoutUser.rejected]: (state, action) => {
            console.log('fetchLogoutUser rejected', action)
            state.loading = false
            state.error = action.error
        }
    }
})


export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer