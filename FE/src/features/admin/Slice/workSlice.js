import workApi from "../../../api/workApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const workData = createAsyncThunk('works/workData', async (page) => {
    const work = await workApi.getAll(page);
    // console.log(work);
    return work;
})
const Work = createSlice({
    name: "works",
    initialState: {
        work: { data: { rows: [] } },
        loading: true,
        error: ''
    },
    reducers: {
        addwork: (state, action) => {
            workApi.postwork(action.payload);
        },
        removework: (state, action) => {
            workApi.deletework(action.payload);
        },
        updatework: (state, action) => {
            workApi.editwork(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(workData.pending, (state) => {
                state.loading = true;
            })
            .addCase(workData.rejected, (state, action) => {
                state.loading = false; // Đặt lại loading = false nếu request thất bại
                state.error = action.error.message; // Lưu nội dung lỗi
            })
            .addCase(workData.fulfilled, (state, action) => {
                state.loading = false;
                state.work = action.payload;
            });
    }
    
});
const { reducer, actions } = Work;
export const { addwork, removework, updatework } = actions;

export default reducer;
