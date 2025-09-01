import {configureStore} from '@reduxjs/toolkit';
import organizationReducer from './organizationSlice';
import planPaymentIndexReducer from './planPaymentIndexSlice';
import paymentTruReducer from './paymentTruSlice';
import indicatorsQualityServiceReducer from './qualityServiceSlice'
import indicatorsVolumeServiceReducer from './volumeServiceSlice'
import actsSettingPriceReducer from './actsSettingThePriceSlice.js'
import informingPotentialConsumerReducer from './informingPotentialConsumersSlice.js'

export const store = configureStore({
    reducer: {
        organizations: organizationReducer,
        paymentTru: paymentTruReducer,
        planPaymentIndex: planPaymentIndexReducer,
        qualityService: indicatorsQualityServiceReducer,
        volumeService: indicatorsVolumeServiceReducer,
        actsSettingPrice: actsSettingPriceReducer,
        informingPotentialConsumers: informingPotentialConsumerReducer
    },
});

