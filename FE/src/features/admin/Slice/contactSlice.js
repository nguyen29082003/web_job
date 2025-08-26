import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactApi from "../../../api/contactApi";

// Tạo async thunk để lấy dữ liệu contact
export const contactData = createAsyncThunk(
    'contacts/contactData',
    async (page, { rejectWithValue }) => {
        try {
            const contact = await contactApi.getAll(page);
            return contact;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Có lỗi xảy ra!");
        }
    }
);

const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        contact: [],
        loading: false,
        error: null,
    },
    reducers: {
        addcontact: (state, action) => {
            contactApi.postcontact(action.payload);
        },
        removecontact: (state, action) => {
            contactApi.deletecontact(action.payload);
        },
        updatecontact: (state, action) => {
            contactApi.editcontact(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(contactData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(contactData.fulfilled, (state, action) => {
                state.loading = false;
                state.contact = action.payload;
            })
            .addCase(contactData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addcontact, removecontact, updatecontact } = contactSlice.actions;
export default contactSlice.reducer;
