import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:8000/api/plan-payment-index/';

// Загрузка по organizationId и году
export const fetchPlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/fetch',
  async ({ orgId, year }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}?organization=${orgId}&year=${year}`);
      if (!res.ok) throw new Error('Ошибка при загрузке данных');
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Ошибка при добавлении записи');
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const cleanedData = { ...data, analyticCode: data.analyticCode || null };
      const res = await fetch(`${API_URL}${id}/`, {
        method: 'PATCH', // <-- заменил PUT на PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        console.error("Ошибка PATCH:", errorResponse);
        throw new Error(errorResponse.detail || 'Ошибка обновления записи');
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlanPaymentIndex = createAsyncThunk(
  'planPaymentIndex/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка при удалении записи');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.error = action.payload;
      })
      .addCase(addPlanPaymentIndex.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addPlanPaymentIndex.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updatePlanPaymentIndex.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updatePlanPaymentIndex.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePlanPaymentIndex.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      })
      .addCase(deletePlanPaymentIndex.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedYear } = planPaymentIndexSlice.actions;
export default planPaymentIndexSlice.reducer;
