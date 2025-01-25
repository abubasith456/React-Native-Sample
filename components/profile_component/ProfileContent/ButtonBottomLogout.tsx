import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyle } from "../../../constants/styles";
const { height } = Dimensions.get("window");

export const ButtonBottomLogout = ({ onClick }: any) => {
    return (
        <View style={styles.logoutButtonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={onClick}>
                <Ionicons name="log-out-outline" size={24} color="#fff" />
                <Text style={styles.logoutText} >Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoutButtonContainer: {
        width: "100%",
        bottom: height * 0.02, // Adjust based on how far you want the button from the bottom
        alignItems: 'center',

    },
    logoutButton: {
        width: "40%",
        backgroundColor: GlobalStyle.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});