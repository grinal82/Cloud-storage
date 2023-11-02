import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCookie from "../common";


export const fetchFiles = createAsyncThunk(
    'files/fetchFiles',
    async () => {
        const csrftoken = getCookie('csrftoken');
        const response = await fetch('http://127.0.0.1:8000/api/user/files/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }
)

export const uploadFile = createAsyncThunk(
    'files/uploadFile',
    async(formData) => {
        const csrftoken = getCookie('csrftoken');
        const response = await fetch('http://127.0.0.1:8000/api/user/files/upload/', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData, {csrfmiddlewaretoken: csrftoken}),
        })
        const data = await response.json();
        return data
    }
)


const filesSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
        uploadStatus: null,// Статус загрузки (успешно, ошибка и т.д.)
        uploadError: null, // Ошибка при загрузке, если есть
        loading: false,
        error: null
    },

    extraReducers: {
        [fetchFiles.pending]: (state) => {
            state.loading = true;
        },
        [fetchFiles.fulfilled]: (state, action) => {
            state.loading = false;
            state.files = action.payload;
        },
        [fetchFiles.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [uploadFile.pending]: (state) => {
            state.loading = true;
        },
        [uploadFile.fulfilled]: (state, action) => {
            state.loading = false;
            state.uploadStatus = 'success';
            state.uploadError = null;
        }
    }
})

export default filesSlice.reducer;