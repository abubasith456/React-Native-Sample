import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native"
import { GlobalStyle } from "../../constants/styles";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export const HomeHeader = ({ profilePicUrl, userName, searchOnPressed }: any) => {
    console.log(" ==> ", profilePicUrl);
    const isProfilePicUrlAvailable = !!profilePicUrl;
    const isuserNameAvailable = !!userName
    return (
        <View style={styles.headerCard}>
            <View style={styles.headerInnerContainer}>
                {
                    isProfilePicUrlAvailable ? <Image
                        source={{ uri: profilePicUrl }}
                        style={styles.headerIcon}
                    /> : <Image
                        source={require('../../assets/favicon.png')}
                        style={styles.headerIcon}
                    />
                }
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
        height: height * 0.15,
        paddingTop: height * 0.07,
        backgroundColor: GlobalStyle.primaryColor,
        borderRadius: 30,
    },
    headerInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    headerIcon: {
        width: 50, // Icon size
        height: 50,
        resizeMode: 'contain', // Keep aspect ratio
        alignSelf: 'center',
        borderRadius: 30
    },
    headerTextContainer: {
        width: "70%",
        marginStart: 10,
    },
    text: {
        fontSize: 16,
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