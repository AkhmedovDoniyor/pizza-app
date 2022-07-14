import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const {sortBy, category, order, search, currentPage} = params;
    const { data } = await axios.get(
      `https://62ad6314645d00a28af8e97d.mockapi.io/pizzas?page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&limit=8`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading, success, error
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success' 
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;




