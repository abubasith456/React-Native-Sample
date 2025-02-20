import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from '../../base_components/Shimmer';

const ShimmerProducts: React.FC = () => {
    return (
        <View style={styles.section}>
            <Shimmer width={150} height={20} style={{ borderRadius: 4, marginBottom: 16 }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={{ width: '48%', marginBottom: 16 }}>
                        <Shimmer width="100%" height={120} style={{ borderRadius: 8 }} />
                        <Shimmer width="100%" height={16} style={{ marginTop: 8, borderRadius: 4 }} />
                        <Shimmer width="60%" height={16} style={{ marginTop: 8, borderRadius: 4 }} />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
});

export default ShimmerProducts;