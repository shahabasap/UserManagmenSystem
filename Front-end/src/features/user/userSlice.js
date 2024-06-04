import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 
const storedUserInfo = localStorage.getItem('userInfo');
const initialState = {
    user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    login: !!storedUserInfo, 
};


const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
            state.login = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },

        userLogout: (state) => {
            state.user = null;
            state.login=false;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { userLogin,userLogout } = userSlice.actions;
export const selectUser = (state) => state.user.login;
export default userSlice.reducer;
