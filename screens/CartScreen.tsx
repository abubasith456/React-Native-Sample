import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../core/state_management/store";
import { updateQuantity, removeItem } from "../core/state_management/screen_slice/CartSlice";
import { Ionicons } from "@expo/vector-icons";
import { BaseView } from "../components/base_components/BaseView";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyle } from "../constants/styles";
import { HeaderCard } from "../components/cart_components/HeaderCard";

const CartScreen: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={GlobalStyle.primaryColor} />
            <HeaderCard />

            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, type: "decrease" }))}>
                                        <Ionicons name="arrow-back" size={24} color="gray" />
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, type: "increase" }))}>
                                        <Ionicons name="arrow-back" size={24} color="green" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                                <Ionicons name="arrow-back" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.totalText}>Total: ${getTotal()}</Text>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    emptyText: { textAlign: "center", color: "gray", marginTop: 20 },
    itemContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8", padding: 12, borderRadius: 10, marginBottom: 10 },
    image: { width: 60, height: 60, borderRadius: 10 },
    details: { flex: 1, marginLeft: 12 },
    itemName: { fontSize: 16, fontWeight: "600" },
    price: { color: "gray" },
    quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    quantity: { fontSize: 16, fontWeight: "600", marginHorizontal: 8 },
    footer: { marginTop: 20, padding: 16, backgroundColor: "#eaeaea", borderRadius: 10 },
    totalText: { fontSize: 18, fontWeight: "bold" },
    checkoutButton: { marginTop: 10, backgroundColor: "#28a745", padding: 12, borderRadius: 10 },
    checkoutText: { textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" },
});
