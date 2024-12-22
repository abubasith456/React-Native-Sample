import { Animated, Easing, Image, StyleSheet, TouchableOpacity } from "react-native";

export const DetailsImageView = ({ product, imageZoom }: any) => {

    // Product image zoom effect on press
    const zoomInImage = () => {
        Animated.timing(imageZoom, {
            toValue: 1.2, // Zoom in
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const zoomOutImage = () => {
        Animated.timing(imageZoom, {
            toValue: 1, // Reset zoom
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageZoom }] }]}>
            <TouchableOpacity onPressIn={zoomInImage} onPressOut={zoomOutImage}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 350,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
});