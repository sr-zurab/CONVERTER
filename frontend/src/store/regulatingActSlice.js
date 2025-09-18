import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = '/api/regulating-act/';

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
export const fetchRegulatingAct = createAsyncThunk(
    'regulationAct/fetch',
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

export const addRegulatingAct = createAsyncThunk(
    'regulationAct/add',
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

export const updateRegulatingAct = createAsyncThunk(
    'regulationAct/update',
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

export const deleteRegulatingAct = createAsyncThunk(
    'regulationAct/delete',
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

const RegulatingActSlice = createSlice({
    name: 'regulationAct',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearActsData: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegulatingAct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegulatingAct.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchRegulatingAct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addRegulatingAct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addRegulatingAct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateRegulatingAct.fulfilled, (state, action) => {
                const index = state.list.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            .addCase(updateRegulatingAct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteRegulatingAct.fulfilled, (state, action) => {
                state.list = state.list.filter((i) => i.id !== action.payload);
            })
            .addCase(deleteRegulatingAct.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {clearRegulationActData} = RegulatingActSlice.actions;
export default RegulatingActSlice.reducer;