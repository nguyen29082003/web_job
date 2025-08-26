import tagApi from "../../../api/tagApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const tagData = createAsyncThunk('tags/tagData', async (page) => {
    const tag = await tagApi.getAll(page);
    return tag;
})
const Tag = createSlice({
    name: "tags",
    initialState: {
        tag: [],
        loading: true,
        error: ''
    },
    reducers: {
        addtag: (state, action) => {
            tagApi.posttag(action.payload);
        },
        removetag: (state, action) => {
            tagApi.deletetag(action.payload);
        },
        updatetag: (state, action) => {
            tagApi.edittag(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(tagData.pending, (state) => {
                state.loading = true;
            })
            .addCase(tagData.rejected, (state, action) => {
                state.loading = false; // Đặt lại loading = false khi API bị lỗi
                state.error = action.error.message; // Lưu chi tiết lỗi
            })
            .addCase(tagData.fulfilled, (state, action) => {
                state.loading = false;
                state.tag = action.payload;
            });
    }
    
});
const { reducer, actions } = Tag;
export const { addtag, removetag, updatetag } = actions;

export default reducer;
