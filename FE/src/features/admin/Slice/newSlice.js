import newApi from "../../../api/newApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const newData = createAsyncThunk('news/newData', async (page) => {
    const news = await newApi.getAll(page);
    return news;
})
const New = createSlice({
    name: "news",
    initialState: {
        new: [],
        loading: true,
        error: ''
    },
    reducers: {
        addnew: (state, action) => {
            newApi.postnew(action.payload);
        },
        removenew: (state, action) => {
            newApi.deletenew(action.payload);
        },
        updatenew: (state, action) => {
            newApi.editnew(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newData.pending, (state) => {
                state.loading = true;
            })
            .addCase(newData.rejected, (state, action) => {
                state.loading = false; // Khi API thất bại, loading phải false
                state.error = action.error.message; // Lấy chi tiết lỗi
            })
            .addCase(newData.fulfilled, (state, action) => {
                state.loading = false;
                state.new = action.payload;
            });
    }
    
});
const { reducer, actions } = New;
export const { addnew, removenew, updatenew } = actions;

export default reducer;
