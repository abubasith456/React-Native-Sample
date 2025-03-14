import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Shimmer from '../base_components/Shimmer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

export const ShimmerProductCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Shimmer
                    width={CARD_WIDTH}
                    height={CARD_WIDTH}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Shimmer
                        width={CARD_WIDTH - 24}
                        height={20}
                        style={styles.titleLine}
                    />
                    {/* <Shimmer
                        width={(CARD_WIDTH - 24) * 0.7}
                        height={20}
                        style={styles.titleLine}
                    /> */}
                    <Shimmer
                        width={80}
                        height={24}
                        style={styles.price}
                    />
                </View>
            </View>
        </View>
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
    image: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    textContainer: {
        padding: 12,
        gap: 8,
    },
    titleLine: {
        borderRadius: 4,
    },
    price: {
        marginTop: 4,
        borderRadius: 4,
    },
});