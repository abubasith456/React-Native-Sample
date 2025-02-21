import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoaderProps {
    visible: boolean;
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ visible, message }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.loader}>
                    <ActivityIndicator animating={true} size="large" color="#6200ee" />
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loader: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default Loader;