import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { APP_NAME } from '../../constants/AppConstants';


const BASE_URL = "https://hayat-shop.onrender.com/api/v1"
const HF_URL = "https://abubasith86-hayat.hf.space/api/v1"
const axiosInstance = axios.create({ baseURL: HF_URL })

export const login = createAsyncThunk<any, { emailData: string, passwordData: string, googleToken: string | null }>(
    'loginApi',
    async (payload, { rejectWithValue }) => {
        const { emailData, passwordData, googleToken } = payload;
        let param = {};
        console.log("loginApi => ", emailData);
        if (googleToken) {
            // If Google token is provided, only send the Google token
            param = { googleToken: googleToken };
        } else if (emailData && passwordData) {
            // If email and password are provided, send them
            param = {
                email: emailData,
                password: passwordData
            };
        } else {
            // If neither email/password nor Google token is provided, throw an error
            throw new Error('Either email/password or Google token must be provided.');
        }

        // Make the POST request with the appropriate parameters
        try {
            const response = await axiosInstance.post("/login", param);
            const responseData = response.data;
            console.log("LOGG => ", responseData);
            return responseData;
        } catch (error: any) {
            // Check if the error is from Axios
            if (error.response) {
                // Return the error message or any other data from the response
                return rejectWithValue(error.response.data.message || 'Login failed');
            } else if (error.request) {
                // Handle no response received
                return rejectWithValue('No response received from server.');
            } else {
                // Handle any other errors
                return rejectWithValue(error.message);
            }
        }
    }
);

export const register = createAsyncThunk<any, { usernameValue: string, emailValue: string, mobileValue: string, passwordValue: string, dateOfBirth: string }>(
    'registerApi', async (payload, { rejectWithValue }) => {
        const { usernameValue, emailValue, mobileValue, passwordValue, dateOfBirth } = payload;

        const isEmailRegistration = Boolean(emailValue);
        const url = isEmailRegistration ? "/register/email" : "/register/mobile";

        const params = {
            'email': emailValue,
            'username': usernameValue,
            'password': passwordValue,
            'passwordConf': passwordValue,
            'dateOfBirth': dateOfBirth
        }

        // Build request parameters based on the type of registration
        const formData = new FormData();
        formData.append('username', usernameValue);
        formData.append('password', passwordValue);
        formData.append('passwordConf', passwordValue);
        formData.append('username', usernameValue);
        formData.append('dateOfBirth', dateOfBirth);


        if (isEmailRegistration) {
            formData.append('email', emailValue)
        } else {
            formData.append('mobileNumber', mobileValue)
        }

        console.log("Register URL =>", url);
        console.log("Register called with params =>", params);
        try {
            const res = await axiosInstance.post(url, params);
            const response = await res.data;
            console.log("Register => ", response);
            return response;
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

export const fetchProfile = createAsyncThunk<any, { userId: string }>(
    'profileApi',
    async (payload, { rejectWithValue }) => {
        console.log(payload);
        const { userId } = payload;
        try {
            const response = await axiosInstance.post("/profile", { userId: userId });
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
    }
);

export const fetchHome = createAsyncThunk<any, { userId: string }>(
    'profileApi',
    async (payload, { rejectWithValue }) => {
        console.log("USERID : ", payload);
        const { userId } = payload;
        try {
            const response = await axiosInstance.get("/home", {
                params: { id: userId }
            });
            console.log("RESPONSE DATA : ", response.data);
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
    }
);

export const fetchProducts = createAsyncThunk(
    'productSearch',
    async (payload, { rejectWithValue }) => {
        try {
            console.log("productSearch: ")
            let categories = []
            if (APP_NAME.includes("Musfi")) {
                categories = ['hijabs', 'featureProducts', 'scarfs']
            } else {
                categories = [, 'vegetables', 'fruits', 'grocery', 'dairy', 'personalCare', 'healthCare', 'babyItems'];
            }
            const apiCalls = categories.map((category) =>
                axiosInstance.get("/" + category)
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
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Failed');
            } else if (error.request) {
                return rejectWithValue('No response received from server.');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async (payload: any, { rejectWithValue }) => {
        try {
            // Create FormData
            const formData = new FormData();
            const imageURL = payload.image;
            // Check if the image URI exists
            if (imageURL && !imageURL.includes("https://")) {
                // Extract the file name and type
                const fileType = imageURL.split('.').pop(); // Get file extension
                const fileName = `${payload.userId}_profile.${fileType}`;

                // Append the file to FormData
                formData.append('file', {
                    uri: Platform.OS === 'ios' ? imageURL.replace('file://', '') : imageURL,
                    name: fileName,
                    type: `image/${fileType}`,
                } as any); // Use `as any` to bypass TypeScript errors

                // Append metadata (e.g., filePath, imageName)
                const filePath = Platform.OS === 'ios' ? imageURL.replace('file://', '') : imageURL;
                formData.append('filePath', filePath);
                formData.append('imageName', fileName);
            }

            // Append other user details
            formData.append('userId', payload.userId); // Required unique_id field
            if (payload.username) formData.append('username', payload.username);
            if (payload.dateOfBirth) formData.append('dateOfBirth', payload.dateOfBirth);
            if (payload.mobileNumber) formData.append('mobileNumber', payload.mobileNumber);
            if (payload.email) formData.append('email', payload.email);

            console.log(formData)

            // Make API call
            const response = await axiosInstance.post('/profileUpdate', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            console.log(" PROFILE ==> ", error)
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Failed');
            } else if (error.request) {
                return rejectWithValue('No response received from server.');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);