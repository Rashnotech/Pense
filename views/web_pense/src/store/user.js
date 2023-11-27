import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    users: [],
    error: ''
}


export const fetchUsers = createAsyncThunk('data/fetchData', async (url, credential) => {
    const res = await fetch (url ,
            {headers: new Headers({'Content-Type': 'application/json'}),
            method: "POST", body: JSON.stringify(credential)})
    const data = await res.json()
    const session_id = Math.floor(Number.EPSILON + Math.random() * 99999)
    sessionStorage.setItem('Browser_session', JSON.stringify({'isLogged': true, 'id': session_id}))
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