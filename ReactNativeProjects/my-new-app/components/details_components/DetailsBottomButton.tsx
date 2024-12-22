import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');


export const DetailsBottomButton = ({ onCartPressed, onBuyPressed }: any) => {
    return (
        <View style={styles.floatingButtonsContainer}>
            <TouchableOpacity style={styles.addToCartButton} onPress={onCartPressed}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={onBuyPressed}>
                <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    floatingButtonsContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 40,
        zIndex: 1000, // Ensure buttons are always on top
    },
    addToCartButton: {
        backgroundColor: '#FF6F00',
        flex: 1,
        paddingVertical: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    buyNowButton: {
        backgroundColor: '#2196F3',
        flex: 1,
        paddingVertical: 15,
        marginLeft: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
