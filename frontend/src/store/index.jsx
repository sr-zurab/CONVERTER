import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './organizationSlice';
import planPaymentIndexReducer from './PlanFhd/planPaymentIndexSlice';
import paymentTruReducer from './PlanFhd/paymentTruSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    paymentTru: paymentTruReducer,
    planPaymentIndex: planPaymentIndexReducer
  },
});

