import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = "http://127.0.0.1:8080"
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
    console.log("payload.image =>", payload.image);

    const filename = payload.image;
    const formData = new FormData();
    console.log("calledededdfdvdfvdfnvkmdfnvj")
    let imageUri = payload.image;
    console.log("calledededdfdvdfvdfnvkmdfnvj")
    // Check if the image is a local file (not already in Firebase)
    if (!filename.includes("https://storage.googleapis.com")) {
        // Append the local image to formData if it's not from Firebase

        const filePath = payload.image.split('file://')[1];  // remove 'file://' prefix
        const fileName = filePath.split('/').pop();  // Extract file name
        formData.append('file', {
            uri: `file://${filePath}`, // Prefix the local file path with 'file://'
            name: fileName,
            type: 'image/jpeg', // Modify this based on the actual image type
        } as any);
    } else {
        formData.append('file', {
            uri: filename, // Prefix the local file path with 'file://'
            name: filename,
            type: 'image/jpeg', // Modify this based on the actual image type
        } as any);
    }
    console.log("calledededdfdvdfvdfnvkmdfnvj")
    // Append additional data (email, userId, etc.)
    formData.append('userId', payload.userId);
    formData.append('email', payload.email);
    formData.append('username', "Mohamed Abu Basith S");
    console.log("DATA = > ", formData.get('file'))
    // formData.append('mobileNumber', payload.mobileNumber); // Uncomment if needed

    // Send the request to the backend, regardless of whether the image is local or hosted
    const res = await axiosInstance.post('/profileUpdate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    console.log("Response =>", res.data);
    return res.data;
});