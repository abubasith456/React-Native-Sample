import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from '../../base_components/Shimmer';

const ShimmerCategories: React.FC = () => {
    return (
        <View style={styles.section}>
            <Shimmer width={100} height={20} style={{ borderRadius: 4, marginBottom: 16 }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <View key={index} style={{ width: '23%', marginBottom: 16 }}>
                        <Shimmer width="100%" height={80} style={{ borderRadius: 8 }} />
                        <Shimmer width="100%" height={16} style={{ marginTop: 8, borderRadius: 4 }} />
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

export default ShimmerCategories;