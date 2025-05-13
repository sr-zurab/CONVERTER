//Первый лист ФХД состояния
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:8000/api/plan-payment-index/';

// Загрузка по organizationId и году
export const fetchPlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/fetch',
  async ({ orgId, year }) => {
    const res = await fetch(`${API_URL}?organization=${orgId}&year=${year}`);
    return await res.json();
  }
);

export const addPlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/add',
  async (data) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

export const updatePlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/update',
  async ({ id, data }) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

export const deletePlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/delete',
  async (id) => {
    await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
    return id;
  }
);

const planPaymentIndexSlice = createSlice({
  name: 'planPaymentIndex',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedYear: null,
  },
  reducers: {
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanPaymentIndex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanPaymentIndex.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlanPaymentIndex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPlanPaymentIndex.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePlanPaymentIndex.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deletePlanPaymentIndex.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export const { setSelectedYear } = planPaymentIndexSlice.actions;
export default planPaymentIndexSlice.reducer;
