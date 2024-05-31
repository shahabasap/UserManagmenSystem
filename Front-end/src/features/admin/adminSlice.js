import { createSlice } from '@reduxjs/toolkit';

const storedAdminInfo = localStorage.getItem('adminInfo');
const initialState = {
    admin: storedAdminInfo ? JSON.parse(storedAdminInfo) : null,
    isAdmin: !!storedAdminInfo, 
};

const adminSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.admin = action.payload;
            state.isAdmin = true;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.admin = null;
            state.isAdmin = false;
            localStorage.removeItem('adminInfo');
        }
    }
});

export const { login, logout } = adminSlice.actions;
export const selectAdmin = (state) => state.admin.isAdmin;
export default adminSlice.reducer;
