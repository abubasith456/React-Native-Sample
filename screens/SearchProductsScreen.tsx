import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from '../core/state_management/store';
import { fetchProducts } from '../core/api/UserRepo';
import { filterProducts } from '../core/state_management/api_slice/SearchSlice';
import { GlobalStyle } from '../constants/styles';

const SearchProductsScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();

    // Get products and loading state from the Redux store
    const { filteredProducts, loading } = useAppSelector((state: RootState) => state.productSearch);

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products when the component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Handle search input change
    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
        dispatch(filterProducts(text)); // Filter products based on search query
    };

    // Render Item for FlatList
    const renderProductItem = ({ item }: any) => (
        <TouchableOpacity style={styles.productCard} onPress={() => {
            navigation.navigate('ProductDetails', { product: item });
        }}>
            {/* Product Image */}
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
            />

            {/* Product Details */}
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>Rs.{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Type to search products..."
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
            {loading ? (
                <ActivityIndicator size="large" color={GlobalStyle.primaryColor} style={styles.loader} />
            ) : (
                <FlatList
                    data={filteredProducts} // Use filteredProducts from Redux
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item._id} // Use product ID for unique keys
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyMessage}>No products found.</Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    searchInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    loader: {
        marginTop: 20,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
});

export default SearchProductsScreen;
