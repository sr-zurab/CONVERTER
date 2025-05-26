import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:8000/api/plan-payment-tru/';

// Загрузка TRU по organization и year
export const fetchPlanPaymentTru = createAsyncThunk(
    'paymentTru/fetch',
    async ({organizationId, year}, {rejectWithValue}) => {
        try {
            const res = await fetch(`${API_URL}?organization=${organizationId}&year=${year}`);
            if (!res.ok) throw new Error('Ошибка загрузки данных');
            return await res.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addPlanPaymentTru = createAsyncThunk(
    'paymentTru/add',
    async (data, {rejectWithValue}) => {
        try {
            const res = await fetch(API_URL, {
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

export const updatePlanPaymentTru = createAsyncThunk(
    'paymentTru/update',
    async ({id, data}, {rejectWithValue}) => {
        try {
            const cleanedData = {...data, analyticCode: data.analyticCode || null};
            const res = await fetch(`${API_URL}${id}/`, {
                method: 'PATCH', // <-- заменил PUT на PATCH
                headers: {'Content-Type': 'application/json'},
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

export const deletePlanPaymentTru = createAsyncThunk(
    'paymentTru/delete',
    async (id, {rejectWithValue}) => {
        try {
            const res = await fetch(`${API_URL}${id}/`, {method: 'DELETE'});
            if (!res.ok) throw new Error('Ошибка удаления записи');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const paymentTruSlice = createSlice({
    name: 'paymentTru',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearTruData: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlanPaymentTru.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlanPaymentTru.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchPlanPaymentTru.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addPlanPaymentTru.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addPlanPaymentTru.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updatePlanPaymentTru.fulfilled, (state, action) => {
                const index = state.list.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            .addCase(updatePlanPaymentTru.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deletePlanPaymentTru.fulfilled, (state, action) => {
                state.list = state.list.filter((i) => i.id !== action.payload);
            })
            .addCase(deletePlanPaymentTru.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {clearTruData} = paymentTruSlice.actions;
export default paymentTruSlice.reducer;
