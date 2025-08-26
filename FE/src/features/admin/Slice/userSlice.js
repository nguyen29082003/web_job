import userApi from "../../../api/userApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userData = createAsyncThunk('users/userData', async (page) => {
    const user = await userApi.getAll(page);
    return user;
})
const User = createSlice({
    name: "users",
    initialState: {
        user: [],
        loading: true,
        error: ''
    },
    reducers: {
        adduser: (state, action) => {
            userApi.postuser(action.payload);
        },
        removeuser: (state, action) => {
            userApi.deleteuser(action.payload);
        },
        updateuser: (state, action) => {
            userApi.edituser(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userData.pending, (state) => {
                state.loading = true;
            })
            .addCase(userData.rejected, (state, action) => {
                state.loading = false; // Phải đặt lại loading = false nếu request thất bại
                state.error = action.error.message; // Lưu nội dung lỗi
            })
            .addCase(userData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            });
    }
    
});
const { reducer, actions } = User;
export const { adduser, removeuser, updateuser } = actions;

export default reducer;
