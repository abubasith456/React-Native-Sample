import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient

interface ShimmerProps {
    width: number | string;
    height: number | string;
    style?: object;
}

const Shimmer: React.FC<ShimmerProps> = ({ width, height, style }) => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateShimmer = () => {
            shimmerAnimation.setValue(0);
            Animated.loop(
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };

        animateShimmer();
    }, []);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-Number(width), Number(width)],
    });

    return (
        <View style={[styles.shimmerContainer, { width, height }, style]}>
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{ translateX }],
                }}
            >
                <LinearGradient
                    colors={['#e1e1e1', '#f5f5f5', '#e1e1e1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    shimmerContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
        overflow: 'hidden',
    },
});

export default Shimmer;