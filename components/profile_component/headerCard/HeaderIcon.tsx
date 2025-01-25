import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image } from "react-native"
import FastImage from 'react-native-fast-image';

export const HeaderIcon = ({ headerIconUrl, isBackButtonNeeded, onBackButtonPress }: any) => {
    const isHeaderUrlAvailable = !!headerIconUrl;
    return (
        <View style={styles.headerContainer}>
            {isBackButtonNeeded ? <Ionicons style={styles.backButton} name="arrow-back" size={25} onPress={onBackButtonPress} /> : <></>}
            <View style={styles.headerinnerView}>
                {
                    isHeaderUrlAvailable ?
                        <Image
                            source={{ uri: headerIconUrl }}
                            resizeMethod="resize" // Resizes image before rendering
                            resizeMode="contain"
                            style={styles.headerIcon}
                        /> : <Image
                            source={require('../../../assets/favicon.png')}
                            style={styles.headerIcon}
                        />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute', // Position back button at the left
        left: 20,
        alignSelf: 'center',
    },
    headerinnerView: {
        width: 120, // Adjust size based on your icon
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20, // Fully rounded for a capsule shape
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Add a subtle shadow for effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    headerIcon: {
        width: 24, // Icon size
        height: 24,
        resizeMode: 'contain', // Keep aspect ratio
    }
});