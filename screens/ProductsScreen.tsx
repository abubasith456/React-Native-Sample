// ProductsScreen.tsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from '../core/state_management/store';
import { fetchProducts } from '../core/api/ProductRepo';
import { Animated } from 'react-native';
import AnimatedCard from '../components/products_components/AnimatedCard';
import LoadingModal from '../components/base_components/LodingModal';

export const ProductsScreen = ({ route, navigation }: any) => {
    const { productName } = route.params;
    const { data, isLoader } = useAppSelector((state: RootState) => state.productsApi);
    const dispatch = useAppDispatch();
    const [animationValues, setAnimationValues] = useState<Animated.Value[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: productName,
        });
    }, [navigation, productName]);

    useEffect(() => {
        // Step 1: Fetch products when productName changes or the component mounts
        dispatch(fetchProducts({ productName }));
    }, [dispatch, productName]); // Only fetch when productName changes or component mounts

    // Handle animation values after data is fetched
    useEffect(() => {
        if (data?.data) {
            // Step 2: Initialize animation values when data is available
            const values = data.data.map(() => new Animated.Value(0)); // Create an animated value for each item
            setAnimationValues(values);

            // Step 3: Animate each item
            values.forEach((animationValue) => {
                Animated.timing(animationValue, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }).start();
            });
        }
    }, [data?.data]);


    // If data is loading, show a loading spinner
    if (isLoader) {
        return (
            <LoadingModal isVisible={isLoader} type='product' />
        );
    }

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // Ensure animationValues has been initialized for the item
        const animationValue = animationValues[index];
        if (!animationValue) return null;

        return (
            <AnimatedCard
                item={item}
                index={index}
                animationValue={animationValue} // Pass individual animation value to the card
                onPressed={(item: any) => {
                    navigation.navigate('ProductDetails', { product: item });
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.data || []} // Ensure the data array is not undefined
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    list: {
        marginTop: 10,
        paddingBottom: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
    },
});
