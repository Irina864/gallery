import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const path = 'https://api.thecatapi.com';
const key =
  'live_qdLlUC0DIEZP6VPEarNCdjPnceI65vk3ONbX74t1ZkMKBPfVU0YuKmObWudfllAb';

export const getData = createAsyncThunk(
  'images/getData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/v1/images/search?order=RANDOM&page=0&limit=10`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    isLoading: false,
    favourites: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fetch error');
    });
  },
});

export default imagesSlice.reducer;
