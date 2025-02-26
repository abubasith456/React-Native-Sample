import { StyleSheet, PixelRatio, Dimensions, Text } from "react-native"
import { GlobalStyle } from "../../constants/styles";
import CustomHeader from "../base_components/CustomHeader";

const { height } = Dimensions.get("window");

export const HeaderCard = ({ profileUrl, headerIconUrl, usernameTitle, userSubTitile, backPressNeeded, onBackButtonPress }: any) => {
    return (
        <CustomHeader>
            <Text style={styles.title}>Shopping Cart</Text>
        </CustomHeader>
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
        fontSize: PixelRatio.getFontScale() * 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "white"
    },

});