import * as SecureStore from 'expo-secure-store';

const KEY_USER_DATA = 'userData';
const KEY_CART_ITEMS = 'cartItems';

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

//|-------------- Cart --------------|

// Save cart items
export const saveCartItems = async (cartItems: Record<string, any>[]) => {
    try {
        const jsonValue = JSON.stringify(cartItems);
        await SecureStore.setItemAsync(KEY_CART_ITEMS, jsonValue);
        console.log('Cart items saved securely!');
    } catch (error) {
        console.error('Error saving cart items:', error);
    }
};

// Retrieve cart items
export const getCartItems = async (): Promise<Record<string, any>[] | null> => {
    try {
        const jsonValue = await SecureStore.getItemAsync(KEY_CART_ITEMS);
        if (jsonValue) {
            const cartItems = JSON.parse(jsonValue);
            console.log('Retrieved cart items:', cartItems);
            return cartItems;
        } else {
            console.log('No cart items found!');
            return [];
        }
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        return null;
    }
};

// Add an item to the cart
export const addItemToCart = async (newItem: Record<string, any>) => {
    try {
        const existingCartItems = await getCartItems();
        const updatedCartItems = existingCartItems ? [...existingCartItems, newItem] : [newItem];
        await saveCartItems(updatedCartItems);
        console.log('Item added to cart:', newItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

// Update cart item
export const updateCartItem = async (itemId: string, updatedData: Record<string, any>) => {
    try {
        const existingCartItems = await getCartItems();
        if (existingCartItems) {
            const updatedCartItems = existingCartItems.map((item) =>
                item.id === itemId ? { ...item, ...updatedData } : item
            );
            await saveCartItems(updatedCartItems);
            console.log('Cart item updated:', updatedCartItems);
        } else {
            console.log('No cart items found to update!');
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
    }
};

// Delete an item from the cart
export const deleteCartItem = async (itemId: string) => {
    try {
        const existingCartItems = await getCartItems();
        if (existingCartItems) {
            const updatedCartItems = existingCartItems.filter((item) => item.id !== itemId);
            await saveCartItems(updatedCartItems);
            console.log(`Cart item with ID ${itemId} deleted!`);
        } else {
            console.log('No cart items found to delete!');
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
    }
};

// Clear all cart items
export const clearCart = async () => {
    try {
        await SecureStore.deleteItemAsync(KEY_CART_ITEMS);
        console.log('All cart items cleared!');
    } catch (error) {
        console.error('Error clearing cart items:', error);
    }
};
