import { StyleSheet, View, Dimensions, Text } from "react-native"
import { GlobalStyle } from "../../constants/styles";

const { height } = Dimensions.get("window");

export const HeaderCard = ({ profileUrl, headerIconUrl, usernameTitle, userSubTitile, backPressNeeded, onBackButtonPress }: any) => {
    return (
        <View style={styles.headerCard}>
            <Text style={styles.title}>Shopping Cart</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        height: height * 0.11,
        paddingTop: height * 0.02,
        backgroundColor: GlobalStyle.primaryColor,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        justifyContent: "center"

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "white"
    },

});