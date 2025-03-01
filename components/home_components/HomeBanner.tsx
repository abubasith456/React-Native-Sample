import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { useEffect, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth - 40;
const ITEM_SPACING = 10;

interface BannerItem {
    name: string;
    percentage: string;
}

interface HomeBannerProps {
    data: BannerItem[];
}

export const HomeBanner = ({ data }: HomeBannerProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const pagerRef = useRef<PagerView>(null);
    const image = "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"

    useEffect(() => {
        const timer = setInterval(() => {
            if (data.length > 0) {
                const nextIndex = (activeIndex + 1) % data.length;
                pagerRef.current?.setPage(nextIndex);
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [activeIndex, data.length]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Special offers!</Text>
            <PagerView
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
                pageMargin={ITEM_SPACING}
            >
                {data.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <ImageBackground
                            style={styles.card}
                            source={{ uri: image }}
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.description}>{item.percentage}</Text>
                        </ImageBackground>
                    </View>
                ))}
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        marginBottom: 10,
        width: '100%',
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    pagerView: {
        flex: 1,
    },
    itemContainer: {
        paddingHorizontal: ITEM_SPACING / 2,
    },
    card: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
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