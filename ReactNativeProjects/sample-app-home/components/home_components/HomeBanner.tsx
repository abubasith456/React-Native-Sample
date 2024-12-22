import { Alert, View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native"
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

export const HomeBanner = ({ data }: any) => {

    const image = "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"

    const renderItem = ({ item }: any) => (
        <ImageBackground
            style={styles.card}
            source={{ uri: image }}
            imageStyle={{ borderRadius: 10, }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.percentage}</Text>
        </ImageBackground >
    );

    return (
        <View style={{ marginHorizontal: 10 }} >
            <Text style={{ fontSize: 17, fontWeight: 'bold', marginHorizontal: 10 }} >Special offers!</Text>
            <Carousel
                loop
                autoPlay
                autoPlayInterval={5000}
                height={200}
                width={screenWidth}
                style={{ marginTop: 10 }}
                data={data ? data : []}
                scrollAnimationDuration={1000}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        padding: 10, // Margins around the carousel
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: 100,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        opacity: 0.7
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    description: {
        fontSize: 14,
    },
});