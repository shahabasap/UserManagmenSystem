import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const storedUserInfo = localStorage.getItem('userInfo');
const initialState = {
    user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    login: !!storedUserInfo, 
};


const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.login = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            state.login=false;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { login,logout } = userSlice.actions;
export const selectUser = (state) => state.user.login;
export default userSlice.reducer;
