import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "https://hayat-shop.onrender.com"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const fetchProfile = createAsyncThunk<any, { userId: string }>(
    'profileApi',
    async (payload) => {
        console.log(payload);
        const { userId } = payload;
        const response = await axiosInstance.post("/profile", { userId: userId });
        console.log(" Ress => ", response.data);
        return response.data;
    }
);

export const fetchHome = createAsyncThunk<any, { userId: string }>(
    'profileApi',
    async (payload) => {
        console.log(payload);
        const { userId } = payload;
        const response = await axiosInstance.get("/home", {
            params: { id: userId }
        });
        console.log(" Ress => ", JSON.stringify(response.data));
        return response.data;
    }
);