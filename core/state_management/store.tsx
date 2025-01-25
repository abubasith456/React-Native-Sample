import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import HomeSlice from './api_slice/HomeSlice';
import SearchProductSlice from './api_slice/SearchSlice';
import ProfileSlice from './api_slice/ProfileSlice';
import LoginSlice from './screen_slice/LoginSlice';
import SignupSlice from './screen_slice/SignupSlice';
import loginSlice from './api_slice/LoginSlice';
import registerSlice from './api_slice/SignInSlice';
import productsSlice from './api_slice/ProductsSlice';
import OrderHistorySlice from './api_slice/OrderHistorySlice';

export const store = configureStore({
    reducer: {
        // Screens
        login: LoginSlice,
        signUp: SignupSlice,
        //Api
        loginApi: loginSlice,
        signUpApi: registerSlice,
        profileApi: ProfileSlice,
        homeApi: HomeSlice,
        productSearch: SearchProductSlice,
        productsApi: productsSlice,
        orderHistoryApi: OrderHistorySlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook for selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;