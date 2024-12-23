import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';


const BASE_URL = "https://hayat-shop.onrender.com"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const fetchProfile = createAsyncThunk<any, { userId: string }>(
    'profileApi',
    async (payload) => {
        console.log(payload);
        const { userId } = payload;
        const response = await axiosInstance.post("/profile", { userId: userId });
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
        return response.data;
    }
);

export const fetchProducts = createAsyncThunk(
    'productSearch',
    async () => {
        const categories = ['vegetables', 'fruits', 'grocery', 'dairy', 'personalCare', 'healthCare', 'babyItems'];
        const apiCalls = categories.map((category) =>
            axiosInstance.get(`${BASE_URL}/${category}`)
        );
        const results = await Promise.all(apiCalls);
        const combinedResults = results.flatMap((response) => response.data);
        const flattenedData = combinedResults.reduce((acc, item) => {
            if (item.success && Array.isArray(item.data)) {
                acc.push(...item.data);
            }
            return acc;
        }, []);
        return flattenedData;
    }
);

export const updateProfile = createAsyncThunk('updateProfile', async (payload: any) => {
    try {
        // Create FormData
        const formData = new FormData();
        const imageURL = payload.image;

        /* try {
            const fileInfo = await FileSystem.getInfoAsync(imageURL);
            if (fileInfo.exists) {
                var imageJSON = {
                    imageName: payload.userId + "_profile.jpg",
                    avatar: fileInfo.uri.toString(),
                    filePath: fileInfo.uri.split('file://')[1]
                }
                formData.append('file', JSON.stringify(imageJSON));
            }
            console.log("File exists:", fileInfo);
        } catch (e) {
            console.log("Error", e);
        } */

        // Append other user details
        formData.append('userId', payload.userId); // Required unique_id field
        if (payload.username) formData.append('username', payload.username);
        if (payload.dateOfBirth) formData.append('dateOfBirth', payload.dateOfBirth);
        if (payload.mobileNumber) formData.append('mobileNumber', payload.mobileNumber);
        if (payload.email) formData.append('email', payload.email);

        // Make API call
        const response = await axiosInstance.post('/profileUpdate', formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error;
    }
});