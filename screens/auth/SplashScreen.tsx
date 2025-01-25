import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { getUserData } from "../../core/local_storage/LocalStorage";
import { StackActions } from "@react-navigation/native";
import { APP_NAME } from "../../constants/AppConstants";

export const SplashScreen = ({ navigation }: any) => {
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale is 0
    const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
    const imagePath = APP_NAME.includes("Musfi") ? require('../../assets/logo-no-background.png') : require('../../assets/logo.png')

    useEffect(() => {
        startAnimation();
        handleRetrieve();
    }, []);

    const startAnimation = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1, // Final scale value
                duration: 2000, // Duration of the zoom effect
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1, // Final opacity value
                duration: 2000, // Duration of the fade-in effect
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleRetrieve = async () => {
        const retrievedData = await getUserData();
        console.log('Retrieved Data:', retrievedData);
        setTimeout(async () => {
            if (retrievedData && Object.keys(retrievedData).length > 0) {
                // User data exists, navigate to home screen
                const data = { userId: retrievedData.user_id }
                console.log("Navigating to Home with params: ", data);
                navigation.dispatch(StackActions.replace("HomeScreen"));
            } else {
                // No user data, navigate to login screen
                navigation.dispatch(StackActions.replace("Login"));
            }
        }, 4000);
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.imageContainer,
                    {
                        transform: [{ scale: scaleAnim }], // Apply scale animation
                        opacity: opacityAnim, // Apply opacity animation
                    },
                ]}
            >
                <Image
                    source={imagePath}
                    style={styles.image}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_NAME.includes("Musfi") ? "black" : "white",
    },
    imageContainer: {
        padding: 20,
    },
    image: {
        height: 170,
        width: 300,
    },
});
