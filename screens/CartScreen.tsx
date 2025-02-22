import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../core/state_management/store";
import { updateQuantity, removeItem } from "../core/state_management/screen_slice/CartSlice";
import { Ionicons } from "@expo/vector-icons";
import { HeaderCard } from "../components/cart_components/HeaderCard";
import LottieView from 'lottie-react-native'; // Use this if you installed manually
import CustomBody from "../components/base_components/CustomBody";

const CartScreen = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderCard />
            <CustomBody>
                {cartItems.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={styles.loaderContainer}>
                            <LottieView
                                source={require('../assets/cart.json')}
                                autoPlay
                                loop
                                style={styles.gif}
                            />
                        </View>
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                    </View>
                ) : (
                    <FlatList
                        style={{ margin: 10 }}
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.price}>Rs.{(item.price * item.quantity).toFixed(2)}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, quantitiy: item.quantity - 1 }))}>
                                            <Ionicons name="remove-sharp" size={24} color="gray" />
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, quantitiy: item.quantity + 1 }))}>
                                            <Ionicons name="add-sharp" size={24} color="green" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                                    <Ionicons name="remove-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}

                {cartItems.length > 0 && (
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Total: Rs.{getTotal()}</Text>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </CustomBody>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    emptyText: { textAlign: "center", color: "gray", marginTop: 20 },
    itemContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8", padding: 12, borderRadius: 10, marginBottom: 10 },
    image: { width: 60, height: 60, borderRadius: 10 },
    details: { flex: 1, marginLeft: 12 },
    itemName: { fontSize: 16, fontWeight: "600" },
    price: { color: "gray" },
    quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    quantity: { fontSize: 16, fontWeight: "600", marginHorizontal: 8 },
    footer: { marginTop: 20, padding: 16, borderRadius: 10 },
    totalText: { fontSize: 18, fontWeight: "bold" },
    checkoutButton: { marginTop: 10, backgroundColor: "#28a745", padding: 12, borderRadius: 10 },
    checkoutText: { textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" },
    loaderContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    gif: {
        width: 200,
        height: 200,
    },
});


// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../core/state_management/store";
// import { updateQuantity, removeItem } from "../core/state_management/screen_slice/CartSlice";
// import { Ionicons } from "@expo/vector-icons";
// import { BaseView } from "../components/base_components/BaseView";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { GlobalStyle } from "../constants/styles";
// import { HeaderCard } from "../components/cart_components/HeaderCard";

// interface CartItem {
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     weight: string;
// }

// const initialCartItems: CartItem[] = [
//     { id: '1', name: 'Bell Pepper Red', quantity: 1, price: 4.99, weight: '1kg', },
//     { id: '2', name: 'Egg Chicken Red', quantity: 1, price: 1.99, weight: '4pcs', },
//     { id: '3', name: 'Organic Bananas', quantity: 1, price: 3.00, weight: '12kg', },
//     { id: '4', name: 'Ginger', quantity: 1, price: 2.99, weight: '250gm', },
// ];

// const CardScreen: React.FC = () => {
//     const cartItems = useSelector((state: RootState) => state.cart.items);
//     const dispatch = useDispatch();

//     // const increaseQuantity = (id: string) => {
//     //     const updatedItems = cartItems.map(item =>
//     //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     //     );
//     //     setCartItems(updatedItems);
//     // };

//     // const decreaseQuantity = (id: string) => {
//     //     const updatedItems = cartItems.map(item =>
//     //         item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
//     //     );
//     //     setCartItems(updatedItems);
//     // };

//     // const removeItem = (id: string) => {
//     //     const updatedItems = cartItems.filter(item => item.id !== id);
//     //     setCartItems(updatedItems);
//     // };

//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

//     const renderItem = ({ item }: { item: CartItem }) => (
//         <View style={styles.itemContainer}>
//             <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemWeight}>{item.quantity}pcs</Text>
//                 <Text style={styles.priceText}>Rs.{item.price.toFixed(2)}</Text>
//                 <View style={styles.quantityContainer}>
//                     <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, type: "decrease" }))} style={styles.quantityButton}>
//                         <Text style={styles.quantityButtonText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantityText}>{item.quantity}</Text>
//                     <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, type: "increase" }))} style={styles.quantityButton}>
//                         <Text style={styles.quantityButtonText}>+</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <TouchableOpacity onPress={() => dispatch(removeItem(item.id))} style={styles.removeButton}>
//                 <Text style={styles.removeButtonText}>X</Text>
//             </TouchableOpacity>

//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>My Cart</Text>
//             <FlatList
//                 data={cartItems as CartItem[] ?? []}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//             />
//             <View style={styles.checkoutContainer}>
//                 <Text style={styles.totalText}>Go to Checkout</Text>
//                 <Text style={styles.totalPrice}>${totalPrice}</Text>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         textAlign: 'center',
//     },
//     itemContainer: {
//         height: 100,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: '#f9f9f9',
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 2.0,
//         elevation: 1,
//     },
//     itemImage: {
//         width: 60,
//         height: 60,
//         marginRight: 10,
//     },
//     itemDetails: {
//         flex: 1,
//     },
//     itemName: {
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     itemWeight: {
//         fontSize: 14,
//         color: '#777',
//     },
//     quantityContainer: {
//         flexDirection: 'row',
//     },
//     quantityButton: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 5,
//         width: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     quantityButtonText: {
//         fontSize: 14,
//     },
//     quantityText: {
//         fontSize: 16,
//         marginHorizontal: 10,
//     },
//     removeButton: {
//         height: 30,
//         width: 30,
//         backgroundColor: '#FF6347',
//         borderRadius: 5,
//         padding: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     removeButtonText: {
//         color: '#ffffff',
//         fontSize: 18,
//     },
//     priceText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     checkoutContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//         backgroundColor: '#4CAF50',
//         padding: 10,  // Reduced height for the button
//         borderRadius: 5,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     totalText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     totalPrice: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default CardScreen;