import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "http://localhost:4000/api/v1"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const fetchProducts = createAsyncThunk<any, { productName: string }>(
    'productsApi',
    async (payload, { rejectWithValue }) => {
        console.log("payload: ", payload)

        const { productName } = payload;
        try {
            const response = await axiosInstance.get('/' + productName);
            console.log(response)
            console.log("response: ", payload)
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

export const fetchOrderHistory = createAsyncThunk<any, { userId: string }>(
    'orderHistoryApi',
    async (payload, { rejectWithValue }) => {
        const { userId } = payload;
        console.log("User ID: ", userId);
        try {
            const response = await axiosInstance.get(`/orders/${userId}`);
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