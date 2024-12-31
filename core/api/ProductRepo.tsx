import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "https://hayat-shop.onrender.com"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const fetchProducts = createAsyncThunk<any, { productName: string }>(
    'productsApi',
    async (payload, { rejectWithValue }) => {
        const { productName } = payload;
        try {
            const response = await axiosInstance.get('/' + productName);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Failed');
            } else if (error.request) {
                return rejectWithValue('No response received from server.');
            } else {
                return rejectWithValue(error.message);
            }
        }
    });