import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Shimmer from '../../base_components/Shimmer';

const { height } = Dimensions.get('window');

const ShimmerHeader: React.FC = () => {
    return (
        <View style={styles.headerCard}>
            <View style={styles.headerInnerContainer}>
                <Shimmer width={height * 0.07} height={height * 0.07} style={{ borderRadius: 20 }} />
                <View style={styles.headerTextContainer}>
                    <Shimmer width={150} height={20} style={{ borderRadius: 4 }} />
                </View>
                <Shimmer width={40} height={40} style={{ borderRadius: 20 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerCard: {
        width: '100%',
        height: height * 0.11,
        paddingTop: height * 0.02,
        backgroundColor: '#e1e1e1',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    headerInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    headerTextContainer: {
        width: '70%',
        marginStart: 10,
    },
});

export default ShimmerHeader;