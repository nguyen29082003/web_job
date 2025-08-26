import typeWorkApi from "../../../api/typeWorkApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const typeWorkData = createAsyncThunk('typeWorks/typeWorkData', async (page) => {
    const typeWork = await typeWorkApi.getAll(page);
    return typeWork;
})
const TypeWork = createSlice({
    name: "typeWorks",
    initialState: {
        typeWork: [],
        loading: true,
        error: ''
    },
    reducers: {
        addtypeWork: (state, action) => {
            typeWorkApi.posttypeWork(action.payload);
        },
        removetypeWork: (state, action) => {
            typeWorkApi.deletetypeWork(action.payload);
        },
        updatetypeWork: (state, action) => {
            typeWorkApi.edittypeWork(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(typeWorkData.pending, (state) => {
                state.loading = true;
            })
            .addCase(typeWorkData.rejected, (state, action) => {
                state.loading = false; // Cần đặt lại loading = false khi bị lỗi
                state.error = action.error.message; // Lưu thông tin lỗi
            })
            .addCase(typeWorkData.fulfilled, (state, action) => {
                state.loading = false;
                state.typeWork = action.payload;
            });
    }
    
});
const { reducer, actions } = TypeWork;
export const { addtypeWork, removetypeWork, updatetypeWork } = actions;

export default reducer;
