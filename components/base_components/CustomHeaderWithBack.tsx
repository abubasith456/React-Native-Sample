// components/CustomHeader.tsx
import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyle } from '../../constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get("window");

interface HeaderProps {
    title: string;
    onBackPress: () => void;
}

const CustomHeaderWithBack = ({ title, onBackPress }: HeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    {/* Back Button */}
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Centered Title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    </View>

                    {/* Right Spacer */}
                    <View style={styles.rightSpacer} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: GlobalStyle.primaryColor,
        position: 'relative',
        width: "100%",
        zIndex: 1000,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
    headerContent: {
        height: height * 0.11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 8,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rightSpacer: {
        width: 40, // Same as back button width for balance
    },
});

export default CustomHeaderWithBack;