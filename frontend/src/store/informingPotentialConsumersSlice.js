import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = '/api/informing-potential-consumers/';

// Хелпер для авторизации
function authFetch(url, options = {}) {
    const token = localStorage.getItem('access');
    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}

// Загрузка по organization,year и section
export const fetchInformingPotentialConsumers = createAsyncThunk(
    'informing/fetch',
    async ({organizationId, year, section}, {rejectWithValue}) => {
        try {
            const res = await authFetch(`${API_URL}?organization=${organizationId}&year=${year}&section=${section}`);
            if (!res.ok) throw new Error('Ошибка загрузки данных');
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addInformingPotentialConsumers = createAsyncThunk(
    'informing/add',
    async (data, {rejectWithValue}) => {
        try {
            const res = await authFetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Ошибка добавления записи');
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateInformingPotentialConsumers = createAsyncThunk(
    'informing/update',
    async ({id, data}, {rejectWithValue}) => {
        try {
            const cleanedData = {...data};
            const res = await authFetch(`${API_URL}${id}/`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(cleanedData),
            });
            if (!res.ok) {
                const errorResponse = await res.json();
                console.error('Ошибка PATCH:', errorResponse);
                throw new Error(errorResponse.detail || 'Ошибка обновления записи');
            }
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteInformingPotentialConsumers = createAsyncThunk(
    'informing/delete',
    async (id, {rejectWithValue}) => {
        try {
            const res = await authFetch(`${API_URL}${id}/`, {method: 'DELETE'});
            if (!res.ok) throw new Error('Ошибка удаления записи');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const InformingPotentialConsumersSlice = createSlice({
    name: 'informing',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearInformingData: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInformingPotentialConsumers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInformingPotentialConsumers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchInformingPotentialConsumers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addInformingPotentialConsumers.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addInformingPotentialConsumers.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateInformingPotentialConsumers.fulfilled, (state, action) => {
                const index = state.list.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            .addCase(updateInformingPotentialConsumers.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteInformingPotentialConsumers.fulfilled, (state, action) => {
                state.list = state.list.filter((i) => i.id !== action.payload);
            })
            .addCase(deleteInformingPotentialConsumers.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {clearInformingData} = InformingPotentialConsumersSlice.actions;
export default InformingPotentialConsumersSlice.reducer;