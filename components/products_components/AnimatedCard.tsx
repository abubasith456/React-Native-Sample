import React from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { GlobalStyle } from '../../constants/styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2; // 36 = marginHorizontal(8) * 2 + spacing between cards(20)

interface Product {
    name: string;
    price: number;
    image?: string;
    images?: string[];
}

interface AnimatedCardProps {
    item: Product;
    index: number;
    animationValue: Animated.Value;
    onPressed: (item: Product) => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ item, index, animationValue, onPressed }) => {
    const animationStyle = {
        // opacity: animationValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 1],
        // }),
        transform: [
            {
                translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                }),
            },
            {
                scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                }),
            },
        ],
    };

    return (
        <Animated.View style={[styles.cardContainer, animationStyle]}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => onPressed(item)}
                activeOpacity={0.7}
            >
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: !item.image ? item.images?.[0] : item.image }}
                        style={styles.productImage}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.productName}>
                        {item.name}
                    </Text>
                    <Text style={styles.productPrice}>
                        Rs. {item.price.toLocaleString()}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH,
        marginHorizontal: 8,
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH, // Make image container square
        backgroundColor: '#f8f9fa',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 20,
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyle.primaryColor,
    },
});

export default AnimatedCard;