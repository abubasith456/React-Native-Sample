import { Animated, TouchableOpacity, View, Text, StyleSheet } from "react-native"


export const DetailsBodyContainer = ({
    selectedQuantity,
    handleDecrement,
    handleIncrement,
    product,
    fadeAnim,
    handleOpenModal
}: any) => {

    const Quantity = () => {
        if (typeof selectedQuantity === 'number') {
            return (
                <View style={styles.quantityContainer}>
                    <Text>Quantity</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Text></Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleDecrement}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{selectedQuantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleIncrement}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            );
        } else {
            return (
                <View style={[styles.quantityContainer, { flexDirection: 'column' }]}>
                    <TouchableOpacity style={styles.openButton} onPress={handleOpenModal}>
                        <Text style={styles.buttonText}>Select Quantity</Text>
                    </TouchableOpacity>

                    <Text style={styles.selectedQuantityText}>Quantity: {selectedQuantity}</Text>
                </View>
            );
        }
    };


    return (< Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]} >
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>Rs.{product.price}</Text>
        </View>
        <View>
            <Text style={styles.productTitle}>Description:</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Quantity Selection */}
        <Quantity />
    </Animated.View >)

}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        flex: 1, // Fill remaining space in the ScrollView
        position: 'relative',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    productName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 26,
        fontWeight: '600',
        color: '#FF6F00',
        textAlign: 'center',
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 18,
        color: 'black',
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginTop: 5
    },

    quantityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        position: 'absolute', // Absolutely position the quantity container
        bottom: 80, // Set distance from the bottom, adjust as needed
        right: 20, // Position on the right side
    },
    quantityButton: {
        backgroundColor: '#FF6F00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    openButton: {
        backgroundColor: '#FF6F00',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedQuantityText: {
        fontSize: 18,
        marginBottom: 40,
    },
});