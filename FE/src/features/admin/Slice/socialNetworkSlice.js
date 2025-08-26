import socialNetworkApi from "../../../api/socialNetworkApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const socialNetworkData = createAsyncThunk('socialNetworks/socialNetworkData', async (page) => {
    const socialNetwork = await socialNetworkApi.getAll(page);
    return socialNetwork;
})
const SocialNetwork = createSlice({
    name: "socialNetworks",
    initialState: {
        socialNetwork: [],
        loading: true,
        error: ''
    },
    reducers: {
        addsocialNetwork: (state, action) => {
            socialNetworkApi.postsocialNetwork(action.payload);
        },
        removesocialNetwork: (state, action) => {
            socialNetworkApi.deletesocialNetwork(action.payload);
        },
        updatesocialNetwork: (state, action) => {
            socialNetworkApi.editsocialNetwork(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(socialNetworkData.pending, (state) => {
                state.loading = true;
            })
            .addCase(socialNetworkData.rejected, (state, action) => {
                state.loading = false; // Cần đặt loading = false khi API bị lỗi
                state.error = action.error.message; // Lấy chi tiết lỗi từ action.error
            })
            .addCase(socialNetworkData.fulfilled, (state, action) => {
                state.loading = false;
                state.socialNetwork = action.payload;
            });
    }
    
});
const { reducer, actions } = SocialNetwork;
export const { addsocialNetwork, removesocialNetwork, updatesocialNetwork } = actions;

export default reducer;
