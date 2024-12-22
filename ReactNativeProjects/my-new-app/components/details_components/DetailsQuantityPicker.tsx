import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions } from 'react-native';
import { quantityOptions } from '../../constants/ProductConstant';

interface QuantitySelectionModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    productCategory: string;
    handleSelectQuantity: (quantity: string) => void;
}

const DetailsQualityPicker: React.FC<QuantitySelectionModalProps> = ({
    modalVisible,
    setModalVisible,
    productCategory,
    handleSelectQuantity,
}) => {
    // Get the screen width
    const screenWidth = Dimensions.get('window').width;
    // Dynamically calculate numColumns based on screen width
    const numColumns = screenWidth > 600 ? 5 : 4; // 4 columns for large screens (e.g. tablets), 2 columns for small screens
    return (
        <Modal
            animationType="fade" // Add fade animation
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Quantity</Text>

                    {/* List of quantities */}
                    <FlatList
                        data={quantityOptions[productCategory] || []}
                        numColumns={numColumns}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleSelectQuantity(item)}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    {/* Close Button */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
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
    modalContent: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 30
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#FF6F00',
        padding: 15,
        margin: 5,
        borderRadius: 10,
        width: "22%"
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default DetailsQualityPicker;
