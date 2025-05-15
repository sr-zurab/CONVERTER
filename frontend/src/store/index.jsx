import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './organizationSlice';
import planPaymentIndexReducer from './planPaymentIndexSlice.jsx';
import paymentTruReducer from './paymentTruSlice.jsx';

export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    paymentTru: paymentTruReducer,
    planPaymentIndex: planPaymentIndexReducer
  },
});

