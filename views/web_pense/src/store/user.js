import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    users: [],
    error: ''
}


export const fetchUsers = createAsyncThunk('data/fetchData', async (_, { rejectWithValue }) => {
    const users = sessionStorage.getItem('Browser_session') ||
                localStorage.getItem('Browser_session')
    const user_id = users && JSON.parse(users).userid
    const url = `${import.meta.env.VITE_API_URL}/user/${user_id}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            const error = await res.json();

            if (error.message === 'User not found') {
                console.log(error.message);
                sessionStorage.removeItem('Browser_session');
                localStorage.removeItem('Browser_session');
            }
            // Instead of using setTimeout, reject the promise with the error value.
            // This will trigger the 'rejected' state, and you can handle it in your reducer.
            return rejectWithValue(error);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        // Handle any other errors (e.g., network issues) by rejecting the promise.
        return rejectWithValue({ message: 'An error occurred while fetching data' });
    }
});


const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.error = '';
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.users = [];
                state.error = action.payload;
                window.location.href = '/login';
            });
    },
});

export default userSlice.reducer;
