// store/organizationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:8000/api/organizations/';

export const fetchOrganizations = createAsyncThunk('orgs/fetch', async () => {
  const res = await fetch(API_URL);
  return await res.json();
});

export const addOrganization = createAsyncThunk('orgs/add', async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
});

export const updateOrganization = createAsyncThunk('orgs/update', async ({ id, data }) => {
  const res = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
});

export const deleteOrganization = createAsyncThunk('orgs/delete', async (id) => {
  await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
  return id;
});

const orgSlice = createSlice({
  name: 'organizations',
  initialState: {
    list: [],
    selected: null,
    selectedReport: null, // ← добавлено
  },
  reducers: {
    selectOrganization: (state, action) => {
      state.selected = action.payload;
      state.selectedReport = null; // сброс отчёта при выборе новой организации
    },
    selectReport: (state, action) => {
      state.selectedReport = action.payload; // например: 'planFhd'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addOrganization.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        const index = state.list.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.list = state.list.filter(o => o.id !== action.payload);
        state.selected = null;
        state.selectedReport = null;
      });
  },
});

export const { selectOrganization, selectReport } = orgSlice.actions;
export default orgSlice.reducer;
