import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { Order, Product } from '../model/OrderModel';
import { fetchOrderHistory } from '../core/api/ProductRepo';

const OrderHistoryScreen = ({ route }: any) => {
    // const { userId } = route.params;
    const userId = "11"
    const dispatch = useAppDispatch();
    const { isLoader, data, isError, errorMessage } = useAppSelector((state: RootState) => state.orderHistoryApi);
    const orderData: Order[] = data || [];
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleExpand = (orderId: string) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    console.log("Data ==> ", JSON.stringify(data))

    // Simulated fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            console.log("fetchOrders for: " + JSON.stringify(route))
            dispatch(fetchOrderHistory({ userId }));
        };
        fetchOrders();
    }, []);

    const renderProducts = (products: Product[]) => (
        <View style={styles.productList}>
            {products.map((product) => (
                <Text key={product._id} style={styles.productItem}>
                    {product.productId}, Quantity: {product.quantity}
                </Text>
            ))}
        </View>
    );

    const renderItem = ({ item }: { item: Order }) => (
        <View>
            <TouchableOpacity style={styles.orderItem} onPress={() => {
                console.log(`Order ID: ${item._id}`)
                toggleExpand(item._id)
            }}>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderId}>Order ID: {item._id}</Text>
                    <Text style={styles.orderDate}>{item.createdAt}</Text>
                </View>
                <View style={styles.orderSummary}>
                    <Text style={styles.orderTotal}>Rs.{item.amount}</Text>
                    <Text style={[styles.orderStatus, getStatusStyle(item.status)]}>{item.status}</Text>
                </View>
            </TouchableOpacity>
            {expandedOrderId === item._id && renderProducts(item.products)}
        </View>
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered':
                return { color: 'green' };
            case 'Cancelled':
                return { color: 'red' };
            case 'Packing':
                return { color: 'orange' };
            default:
                return { color: 'gray' };
        }
    };

    if (isLoader) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    if (data?.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No orders found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data || []}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#7f8c8d',
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 16,

        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderDetails: {
        flex: 1,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
    },
    orderDate: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
    },
    orderSummary: {
        alignItems: 'flex-end',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    orderStatus: {
        fontSize: 14,
        marginTop: 4,
    },

    productList: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    productItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
});

export default OrderHistoryScreen;
