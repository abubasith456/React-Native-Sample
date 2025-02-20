import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet, Animated, Dimensions, Easing, ScrollView
} from 'react-native';
import DetailsQualityPicker from '../components/details_components/DetailsQuantityPicker';
import { DetailsBodyContainer } from '../components/details_components/DetailsBodyContainer';
import { ProductDetailsModel, quantityOptions } from '../constants/ProductConstant';
import { DetailsImageView } from '../components/details_components/DetailsImageView';
import { DetailsBottomButton } from '../components/details_components/DetailsBottomButton';
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { addItem } from '../core/state_management/screen_slice/CartSlice';


const ProductDetails = ({ route, navigation }: any) => {
    const { product, productName } = route.params; // Product data passed from navigation
    if (!product || !product.category) {
        product.category = productName || 'defaultCategory';  // Fallback if no productName
    }
    const prod = product as ProductDetailsModel
    const dispatch = useAppDispatch();
    // State to control modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    // Quantity state
    const [quantity, setQuantity] = useState(1);
    // Animated values for image zoom and opacity effects
    const [imageZoom] = useState(new Animated.Value(1));
    const [fadeAnim] = useState(new Animated.Value(0));

    const handleOpenModal = () => {
        setModalVisible(true); // Open the modal
    };

    // Increment and decrement logic for countable items
    const handleIncrement = () => {
        if (typeof selectedQuantity === 'number') {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (typeof selectedQuantity === 'number' && selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    };

    const categoryOptions = quantityOptions[prod.category] || [];

    const [selectedQuantity, setSelectedQuantity] = useState<string | number>(
        categoryOptions.length > 0 ? categoryOptions[0] : 1 // Fallback to 0 if no options
    );

    const handleSelectQuantity = (value: any) => {
        setSelectedQuantity(value); // Set the selected quantity
        setModalVisible(false); // Close the modal after selection
    };

    useEffect(() => {
        // Fade-in effect for the product details and image
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: selectedQuantity as number,
            image: product.images[0],
        };
        // console.log('====================================');
        // console.log(cartItem);
        // console.log('====================================');
        dispatch(addItem(cartItem)); // Dispatch the addItem action
    };

    return (
        <View style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Product Image with Zoom Effect */}
                <DetailsImageView
                    product={product}
                    imageZoom={imageZoom} />

                {/* Product Details Section */}
                <DetailsBodyContainer
                    selectedQuantity={selectedQuantity}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                    product={product}
                    fadeAnim={fadeAnim}
                    handleOpenModal={handleOpenModal}
                />
            </ScrollView>

            {/* Fixed Floating Action Buttons */}
            <DetailsBottomButton
                onCartPressed={handleAddToCart}
                onBuyPressed={() => {
                    alert('Proceed to Buy')
                }}
            />

            {/* Quantity Selection Modal */}
            <DetailsQualityPicker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                productCategory={product.category}
                handleSelectQuantity={handleSelectQuantity}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flex: 1, // Ensure the content takes up remaining space
    },
});

export default ProductDetails;
