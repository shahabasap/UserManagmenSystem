import { createSlice } from '@reduxjs/toolkit';

const storedAdminInfo = localStorage.getItem('adminInfo');
const initialState = {
    admin: storedAdminInfo ? JSON.parse(storedAdminInfo) : null,
    isAdmin: !!storedAdminInfo, 
};

const adminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.admin = action.payload;
            state.isAdmin = true;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },

        adminLogout: (state) => {
            state.admin = null;
            state.isAdmin = false;
            localStorage.removeItem('adminInfo');
        }
    }
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export const selectAdmin = (state) => state.admin.isAdmin;
export default adminSlice.reducer;
