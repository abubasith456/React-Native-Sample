import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from '../../base_components/Shimmer';

const ShimmerRecentPurchases: React.FC = () => {
    return (
        <View style={styles.section}>
            <Shimmer width={150} height={20} style={{ borderRadius: 4, marginBottom: 16 }} />
            {Array.from({ length: 3 }).map((_, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Shimmer width={50} height={50} style={{ borderRadius: 8 }} />
                    <View style={{ marginLeft: 16 }}>
                        <Shimmer width={120} height={16} style={{ marginBottom: 8, borderRadius: 4 }} />
                        <Shimmer width={80} height={16} style={{ borderRadius: 4 }} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
});

export default ShimmerRecentPurchases;