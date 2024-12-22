import { Alert, View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { useEffect } from "react";
import { fetchHome } from "../core/api/UserRepo";
import { HomeHeader } from "../components/home_components/HomeHeader";
import { HomeBanner } from "../components/home_components/HomeBanner";

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const { data, error, errorMessage } = useAppSelector((state: RootState) => state.homeApi);
    const userData = data?.data.user
    const userId = "11"

    const image = "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"

    useEffect(() => {
        dispatch(fetchHome({ userId }))
        if (error) {
            Alert.alert("Error", errorMessage ? errorMessage : "Something went wrong!");
        }
    }, []);


    return (
        <View style={{ flex: 1 }} >
            {/* Home Header View */}
            <HomeHeader
                profilePicUrl={userData?.profilePic}
                userName={userData?.email} />
            {/* Banner View */}
            <View style={styles.bodyContainer} >
                <HomeBanner data={data?.data.banner} />
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        padding: 10, // Margins around the carousel
        alignItems: 'center',
        justifyContent: 'center',
    },
});
