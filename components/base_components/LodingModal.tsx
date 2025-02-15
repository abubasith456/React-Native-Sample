// LoadingModal.tsx

import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Use this if you installed manually
// or
// import Lottie from 'lottie-react-native';  // For Expo

interface LoadingModalProps {
    isVisible: boolean;
    type: 'normal' | 'home' | 'product'
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, type = 'normal' }) => {

    console.log("LoadingModal called!.....: ", isVisible)

    let path = require('../../assets/loadingJSON.json')
    if (type == 'home') {
        path = require('../../assets/homeLoadingJSON.json')
    } else if (type == 'product') {
        path = require('../../assets/productsLoading.json')
    }
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => { }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.loaderContainer}>
                    <LottieView
                        source={path}
                        autoPlay
                        loop
                        style={styles.gif}
                    />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    gif: {
        width: 200,
        height: 200,
    },
});

export default LoadingModal;
