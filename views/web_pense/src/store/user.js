import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const users = sessionStorage.getItem('Browser_session') ||
                localStorage.getItem('Browser_session')
const user_id = JSON.parse(users) 
const url = `http://127.0.0.1:5000/api/v1/user${user_id.id}`

const initialState = {
    loading: false,
    users: [],
    error: ''
}


export const fetchUsers = createAsyncThunk('data/fetchData', async (url) => {
    const res = await fetch (url , {headers: new Headers({'Content-Type': 'application/json'})})
    const data = await res.json()
    return data
});


const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false,
            users = action.payload,
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer