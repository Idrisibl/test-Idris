import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  card: null,
  order: null,
  result: null,
};

export const fetchCard = createAsyncThunk(
  "card/fetchCard",
  async ({ currentPage, sort }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/orders?count=${currentPage}&onlyActive=${sort}`
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "card/fetchOrder",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/orders/${id}`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  "card/changeOrderStatus",
  async ({ order, id }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/orders/${id}`, {
        ...order,
        isDelivered: !order.isDelivered,
      });

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.card = action.payload;
      state.result = action.payload.items;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export default cardSlice.reducer;
