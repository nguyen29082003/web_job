import checkCompanyApi from "../../../api/companyApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk để gọi API
export const checkCompanyData = createAsyncThunk(
    "checkCompanys/checkCompanyData",
    async (page) => {
        const checkCompany = await checkCompanyApi.getCheck(page);
        return checkCompany;
    }
);

const checkCompanySlice = createSlice({
    name: "checkCompanys",
    initialState: {
        checkCompany: [],
        loading: true,
        error: "",
    },
    reducers: {
        addcheckCompany: (state, action) => {
            checkCompanyApi.postcompany(action.payload);
        },
        removecheckCompany: (state, action) => {
            checkCompanyApi.deletecompany(action.payload);
        },
        updatecheckCompany: (state, action) => {
            checkCompanyApi.editcompany(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkCompanyData.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkCompanyData.fulfilled, (state, action) => {
                state.loading = false;
                state.checkCompany = action.payload;
            })
            .addCase(checkCompanyData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Xuất các action và reducer
export const { addcheckCompany, removecheckCompany, updatecheckCompany } = checkCompanySlice.actions;
export default checkCompanySlice.reducer;
