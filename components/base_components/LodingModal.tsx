// LoadingModal.tsx

import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Use this if you installed manually
// or
// import Lottie from 'lottie-react-native';  // For Expo

interface LoadingModalProps {
    isVisible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible }) => {
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
                        source={require('../../assets/loadingJSON.json')}
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
