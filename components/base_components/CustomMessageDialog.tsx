// CustomMessageDialog.tsx

import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native'; // Use this for Lottie animations, or Expo's Lottie if using Expo.

interface CustomMessageDialogProps {
    isVisible: boolean;
    message: string;
    type: 'error' | 'info' | 'success'; // Type of message: error, info, success
    onClose: () => void; // Function to handle closing the dialog
}

const CustomMessageDialog: React.FC<CustomMessageDialogProps> = ({
    isVisible,
    message,
    type,
    onClose,
}) => {
    // Choose the appropriate Lottie animation based on the message type
    let animationSource = require('../../assets/infoJson.json'); // default animation
    switch (type) {
        case 'error':
            animationSource = require('../../assets/errorJson.json');
            break;
        case 'info':
            animationSource = require('../../assets/infoJson.json');
            break;
        case 'success':
            animationSource = require('../../assets/successJson.json');
            break;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            statusBarTranslucent={true}
            hardwareAccelerated={true}
            presentationStyle="fullScreen"
            onRequestClose={onClose}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.dialogContainer}>
                    {/* Lottie Animation */}
                    <LottieView
                        source={animationSource}
                        autoPlay
                        loop={false}
                        style={styles.animation}
                    />
                    <Text style={styles.messageText}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    dialogContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    animation: {
        width: 100,
        height: 100,
    },
    messageText: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: 'center',
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CustomMessageDialog;
