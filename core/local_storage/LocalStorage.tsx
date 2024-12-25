import * as SecureStore from 'expo-secure-store';

const KEY_USER_DATA = 'userData';

export const saveUserData = async (userData: Record<string, any>) => {
    try {
        const jsonValue = JSON.stringify(userData);
        await SecureStore.setItemAsync(KEY_USER_DATA, jsonValue);
        console.log('User data saved securely!');
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const getUserData = async (): Promise<Record<string, any> | null> => {
    try {
        const jsonValue = await SecureStore.getItemAsync(KEY_USER_DATA);
        if (jsonValue) {
            const userData = JSON.parse(jsonValue);
            console.log('Retrieved user data:', userData);
            return userData;
        } else {
            console.log('No user data found!');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

export const updateUserData = async (newData: Record<string, any>) => {
    try {
        const existingData = await getUserData();
        if (existingData) {
            const updatedData = { ...existingData, ...newData };
            await SecureStore.setItemAsync(KEY_USER_DATA, JSON.stringify(updatedData));
            console.log('User data updated:', updatedData);
        } else {
            console.log('No existing data to update!');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

export const deleteUserData = async () => {
    try {
        await SecureStore.deleteItemAsync(KEY_USER_DATA);
        console.log('User data deleted!');
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
};
