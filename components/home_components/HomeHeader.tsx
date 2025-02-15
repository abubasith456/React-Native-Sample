import { StyleSheet, View, Dimensions, Text, TouchableOpacity, PixelRatio } from "react-native"
import { GlobalStyle } from "../../constants/styles";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UDpyRVcLyyOViNVGvvk-TRAbmWfif0nemg&s";

export const HomeHeader = ({ profilePicUrl, userName, searchOnPressed }: any) => {
    console.log(" ==> ", profilePicUrl);
    const isProfilePicUrlAvailable = !!profilePicUrl;
    const isuserNameAvailable = !!userName
    return (
        <View style={styles.headerCard}>
            <View style={styles.headerInnerContainer}>
                <Image
                    source={{ uri: profilePicUrl || profilePic }}
                    resizeMethod="resize" // Resizes image before rendering
                    resizeMode="contain"
                    style={styles.headerIcon}
                />
                <View style={styles.headerTextContainer} >
                    {isuserNameAvailable ?
                        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>Hai, {userName}</Text> :
                        <Text style={styles.text}>Welcome!</Text>}
                </View>
                <TouchableOpacity style={styles.iconContainer} onPress={searchOnPressed}>
                    <Ionicons name="search" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    headerCard: {
        width: "100%",
        height: height * 0.11,
        paddingTop: height * 0.02,
        backgroundColor: GlobalStyle.primaryColor,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
    headerInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
    headerIcon: {
        height: height * 0.07,
        width: height * 0.07,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000', // Add a subtle shadow for effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headerTextContainer: {
        width: "70%",
        marginStart: 10,
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 18,
        fontWeight: 'bold',
        color: 'white',
    },
    iconContainer: {
        marginStart: 10,
        marginLeft: 'auto',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e8f0fe',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    }
});