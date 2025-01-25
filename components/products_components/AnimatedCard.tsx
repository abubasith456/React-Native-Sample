// AnimatedCard.tsx
import React from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AnimatedCard = ({ item, index, animationValue, onPressed }: { item: any, index: number, animationValue: Animated.Value, onPressed: any }) => {
    const animationStyle = {
        transform: [
            {
                translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [60, 0], // Start 50px below and move to 0px
                }),
            },
        ],
    };

    const onCardPressed = () => {
        onPressed(item);
    }

    return (
        <Animated.View style={[styles.cardContainer, animationStyle]}>
            <TouchableOpacity style={styles.card} onPress={onCardPressed}>
                <Image resizeMode="contain" source={{ uri: !item.image ? item.images[0] : item.image }} style={styles.productImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Rs.{item.price}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 150, // Adjust height as needed
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textContainer: {
        padding: 12,
        alignItems: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#27ae60',
    },
});


export default AnimatedCard;
