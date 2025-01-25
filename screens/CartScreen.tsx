// screens/CartScreen.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { addItem, removeItem, clearCart, CartItem } from '../core/state_management/screen_slice/Cart';
import { getCartItems, saveCartItems } from '../core/local_storage/LocalStorage';
import { GlobalStyle } from '../constants/styles';

const CartScreen = ({ navigation }: any) => {
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    const [userId, setUserId] = useState("");
    // const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    // const { data, isLoader, isError } = useSelector(state => state.placeOrder);

    useEffect(() => {
        // Load cart items when the component mounts
        loadCartItems();

        // if (data != null) {
        //     console.log(" DATA not NUlol ==> " + JSON.stringify(data));
        //     if (data.success) {
        //         dispatch(resetPlaceOrderState());
        //         deleteAllCartItems();
        //         setCartItems([]);
        //         showConfirmationAlert(
        //             'Success!',
        //             'Order placed succesfully.',
        //             "OK",
        //             "",
        //             () => {
        //                 loadCartItems();
        //             },
        //             () => { }
        //         );
        //     } else if (isError) {

        //     }
        // }

    }, []);

    const isCartItem = (item: any): item is CartItem => {
        return (
            item &&
            typeof item.id === 'number' &&
            typeof item.name === 'string' &&
            typeof item.price === 'number' &&
            typeof item.image === 'string' &&
            typeof item.quantity === 'number'
        );
    };

    const loadCartItems = async () => {
        const storedCartItems = await getCartItems();
        if (storedCartItems) {
            // Filter out invalid items that don't match CartItem type
            const validItems = storedCartItems.filter(isCartItem);
            setCartItems(validItems);
        } else {
            setCartItems([]);
        }
    };

    const handleDeleteItem = (id: string) => {

    };

    const handlePlaceOrder = () => {
        const orders = {
            "unique_id": userId,
            "numOfItems": 0,
            "user_id": userId,
            "user_name": "Test",
            "products": cartItems,
            "amount": 10000,
        }
        navigation.navigate('OrderSummery', {
            cartItems: orders
        });
        // showConfirmationAlert(
        //     'Place Order',
        //     'Are you sure you want to place the order?',
        //     "Yes",
        //     "NO",
        //     () => {
        //         const orders = {
        //             "unique_id": userId,
        //             "numOfItems": cartItems.length,
        //             "user_id": userId,
        //             "user_name": "Abu",
        //             "products": cartItems,
        //             "amount": 10000,
        //             "address": "kjascakjsbcjksa"
        //         }


        //         // dispatch(placeOrder({ orders: orders }));
        //     },
        //     () => { }
        // );
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.productImage }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            {cartItems?.length == 0 ?
                <View style={styles.noItemText}>
                    <Text style={{ color: "black" }}> No items added yet!</Text>
                </View> : null
            }

            {cartItems?.length !== 0 ? <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            /> : null}
            {cartItems?.length !== 0 ? <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noItemText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: GlobalStyle.primaryColor,
    },
    itemQuantity: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
    },
    placeOrderButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,

    },
    placeOrderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal',
    },
});

export default CartScreen;
