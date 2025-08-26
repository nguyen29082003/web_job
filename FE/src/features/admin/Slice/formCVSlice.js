import formCVApi from "../../../api/formCVApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const formCVData = createAsyncThunk('formCVs/formCVData', async (page) => {
    const formCV = await formCVApi.getAll(page);
    return formCV;
})
const FormCv = createSlice({
    name: "formCVs",
    initialState: {
        formCV: [],
        loading: true,
        error: ''
    },
    reducers: {
        addformCV: (state, action) => {
            formCVApi.postformCV(action.payload);
        },
        removeformCV: (state, action) => {
            formCVApi.deleteformCV(action.payload);
        },
        updateformCV: (state, action) => {
            formCVApi.editformCV(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(formCVData.pending, (state) => {
                state.loading = true;
            })
            .addCase(formCVData.rejected, (state, action) => {
                state.loading = false; // Khi lỗi, loading phải false
                state.error = action.error.message; // Lấy chi tiết lỗi
            })
            .addCase(formCVData.fulfilled, (state, action) => {
                state.loading = false;
                state.formCV = action.payload;
            });
    }
    
});
const { reducer, actions } = FormCv;
export const { addformCV, removeformCV, updateformCV } = actions;

export default reducer;
