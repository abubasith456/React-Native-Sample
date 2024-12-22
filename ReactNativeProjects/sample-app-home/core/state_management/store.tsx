//ToolKit
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import HomeSlice from './api_slice/HomeSlice';

export const store = configureStore({
    reducer: {
        homeApi: HomeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook for selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;