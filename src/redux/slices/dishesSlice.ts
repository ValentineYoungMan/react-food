import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Dish = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: number;
  rating: number;
  weight: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface DishSliceState {
  items: Dish[];
  status: Status;
}

const initialState: DishSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  search: string;
  category: string;
  currentPage: string;
};

export const fetchDishes = createAsyncThunk<Dish[], SearchPizzaParams>(
  'dish/fetchDishesStatus',
  async (params) => {
    const { sortBy, order, search, category, currentPage } = params;
    const { data } = await axios.get<Dish[]>(
      `https://641f346cf228f1a83eb2a028.mockapi.io/items?page=${currentPage}&limit=16&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

//export
const dishesSlice = createSlice({
  name: 'dishSlice',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Dish[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDishes.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  //   extraReducers: {
  //     [fetchDishes.pending]: (state, action) => {
  //       state.status = 'loading';
  //       state.items = [];
  //     },
  //     [fetchDishes.fulfilled]: (state, action) => {
  //       state.items = action.payload;
  //       state.status = 'success';
  //     },
  //     [fetchDishes.rejected]: (state, action) => {
  //       state.status = 'error';
  //       state.items = [];
  //     },
  //   },
});

export const selectDishesData = (state: RootState) => state.dishesSlice;

export const { setItems } = dishesSlice.actions;

export default dishesSlice.reducer;
