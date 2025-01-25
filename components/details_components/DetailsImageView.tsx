import { Animated, Easing, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import React, { useState } from 'react';
const { height, width } = Dimensions.get("window");


export const DetailsImageView = ({ product, imageZoom }: any) => {
    // Product image zoom effect on press
    const zoomInImage = () => {
        Animated.timing(imageZoom, {
            toValue: 1.2, // Zoom in
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const zoomOutImage = () => {
        Animated.timing(imageZoom, {
            toValue: 1, // Reset zoom
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const isMultipleImages = Array.isArray(product.images) && product.images.length > 0;

    return (
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageZoom }] }]}>
            {isMultipleImages ?
                // FlatList for multiple images
                <FlatList
                    data={product.images} // Array of image URLs
                    horizontal

                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPressIn={zoomInImage} onPressOut={zoomOutImage}>
                            <Image
                                resizeMode="contain"
                                source={{ uri: item }}
                                style={{
                                    height: height * 0.35,
                                    width: width,
                                    // backgroundColor: 'black'
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
                : (
                    // Single image if product.images does not exist
                    <TouchableOpacity onPressIn={zoomInImage} onPressOut={zoomOutImage}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 350,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    imageWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
    },
});