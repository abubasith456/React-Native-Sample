import { StyleSheet, View, Dimensions } from "react-native"
import { GlobalStyle } from "../../../constants/styles";
import { HeaderIcon } from "./HeaderIcon";
import { HeaderProfile } from "./HeaderProfile";

const { height } = Dimensions.get("window");

export const HeaderCard = ({ profileUrl, headerIconUrl, usernameTitle, userSubTitile, backPressNeeded, onBackButtonPress }: any) => {
    return (
        <View style={styles.headerCard}>
            {/* <HeaderIcon headerIconUrl={headerIconUrl} isBackButtonNeeded={backPressNeeded} onBackButtonPress={onBackButtonPress} /> */}
            <HeaderProfile
                usernameTitle={usernameTitle}
                userSubTitile={userSubTitile}
                profilePicUrl={profileUrl} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        height: height * 0.11,
        paddingTop: height * 0.02,
        backgroundColor: GlobalStyle.primaryColor,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
});