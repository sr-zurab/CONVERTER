import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './organizationSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
  },
});

