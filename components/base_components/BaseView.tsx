import React from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

export const BaseView = ({ children }: any) => {
    return (
        <KeyboardAvoidingView style={styles.outerContainer} behavior="padding">
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>{children}</View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff', // Optional: Adjust background color
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center', // Adjust to align items in the center vertically
        alignItems: 'center', // Align items in the center horizontally
        padding: 20, // Add padding for better spacing
    },
});
