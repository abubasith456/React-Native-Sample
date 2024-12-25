import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ goBack }: any) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
    )
}

export const BackButtonWithText = ({ navigation, title }: any) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: getStatusBarHeight(),
        left: 5,
    },
    image: {
        width: 25,
        height: 25,
        color: "black"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // Header background color
        height: 60,
        paddingHorizontal: 16,
    },
    backButton: {
        marginRight: 8,
        color: "white",
    },
})