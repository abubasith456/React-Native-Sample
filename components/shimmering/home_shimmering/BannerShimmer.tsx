import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Shimmer from '../../base_components/Shimmer';

const { width: screenWidth } = Dimensions.get('window');

const ShimmerBanner: React.FC = () => {
    return (
        <View style={{ marginHorizontal: 10, height: 150 }}>
            <Shimmer width={150} height={20} style={{ borderRadius: 4, marginHorizontal: 10 }} />
            <View style={{ marginTop: 10 }}>
                <Shimmer width={screenWidth - 20} height={100} style={{ borderRadius: 10, marginHorizontal: 10 }} />
            </View>
        </View>
    );
};

export default ShimmerBanner;