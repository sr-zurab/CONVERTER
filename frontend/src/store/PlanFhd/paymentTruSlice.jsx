//Второй лист ФХД состояния
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:8000/api/plan-payment-tru/';

// Загрузка TRU по organization и year
export const fetchPlanPaymentTru = createAsyncThunk(
  'paymentTru/fetch',
  async ({ organizationId, year }) => {
    const res = await fetch(`${API_URL}?organization=${organizationId}&year=${year}`);
    return await res.json();
  }
);

export const addPlanPaymentTru = createAsyncThunk(
  'paymentTru/add',
  async (data) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

export const updatePlanPaymentTru = createAsyncThunk(
  'paymentTru/update',
  async ({ id, data }) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

export const deletePlanPaymentTru = createAsyncThunk(
  'paymentTru/delete',
  async (id) => {
    await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
    return id;
  }
);

const paymentTruSlice = createSlice({
  name: 'paymentTru',
  initialState: {
    list: [],
  },
  reducers: {
    clearTruData: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanPaymentTru.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addPlanPaymentTru.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePlanPaymentTru.fulfilled, (state, action) => {
        const index = state.list.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deletePlanPaymentTru.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.id !== action.payload);
      });
  },
});

export const { clearTruData } = paymentTruSlice.actions;
export default paymentTruSlice.reducer;
