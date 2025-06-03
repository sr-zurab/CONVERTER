// store/organizationSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = '/api/organizations/';

export const fetchOrganizations = createAsyncThunk('orgs/fetch', async (_, {rejectWithValue}) => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Ошибка загрузки организаций');
        return await res.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addOrganization = createAsyncThunk('orgs/add', async (data, {rejectWithValue}) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Ошибка добавления организации');
        return await res.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateOrganization = createAsyncThunk('orgs/update', async ({id, data}, {rejectWithValue}) => {
    try {
        const res = await fetch(`${API_URL}${id}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Ошибка обновления организации');
        return await res.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteOrganization = createAsyncThunk('orgs/delete', async (id, {rejectWithValue}) => {
    try {
        const res = await fetch(`${API_URL}${id}/`, {method: 'DELETE'});
        if (!res.ok) throw new Error('Ошибка удаления организации');
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const orgSlice = createSlice({
    name: 'organizations',
    initialState: {
        list: [],
        selected: null,
        selectedReport: null, // ← добавлено
        error: null,
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
                state.error = null;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addOrganization.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.error = null;
            })
            .addCase(addOrganization.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                const index = state.list.findIndex(o => o.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
                state.selected = action.payload;
                state.error = null;
            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteOrganization.fulfilled, (state, action) => {
                state.list = state.list.filter(o => o.id !== action.payload);
                state.selected = null;
                state.selectedReport = null;
                state.error = null;
            })
            .addCase(deleteOrganization.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {selectOrganization, selectReport} = orgSlice.actions;
export default orgSlice.reducer;
