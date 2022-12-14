import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cardStatic } from "./constants";

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
      // return thunkAPI.rejectWithValue();
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
      // return thunkAPI.rejectWithValue();
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
    builder
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.card = action.payload;
        state.result = action.payload.items;
      })
      .addCase(fetchCard.rejected, (state, action) => {
        const items = cardStatic.items
          ?.filter((card) =>
            !action.meta.arg.sort ? card.isDelivered === false : card
          )
          .slice(0, action.meta.arg.currentPage);
        state.card = { items, total: cardStatic.total };
      });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.order = cardStatic.items.find((item) => item.id === Number(action.meta.arg))
      
    });
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

console.log(initialState)

export default cardSlice.reducer;
