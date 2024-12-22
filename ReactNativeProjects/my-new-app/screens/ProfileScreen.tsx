import { View } from "react-native"
import { useEffect } from "react";
import { HeaderCard } from "../components/profile_component/headerCard/HeaderCard";
import { ProfileContent } from "../components/profile_component/ProfileContent/ProfileContent";
import { ButtonBottomLogout } from "../components/profile_component/ProfileContent/ButtonBottomLogout";
import { fetchProfile } from "../core/api/UserRepo";
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";

const headerIconUrl: string = ""
const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UDpyRVcLyyOViNVGvvk-TRAbmWfif0nemg&s"

export const ProfileScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { data }
        = useAppSelector((state: RootState) => state.profileApi);

    useEffect(() => {
        const userId = "11"
        dispatch(fetchProfile({ userId }))
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            {/* Profile Header COntent */}
            <HeaderCard
                usernameTitle={"Mohamed Abu Basith S"}
                userSubTitile={data?.email}
                profileUrl={data?.profilePic}
                headerIconUrl={headerIconUrl}
                backPressNeeded={false}
                onBackButtonPress={() => { navigation.goBack(); }} />
            {/* Profile Bottom Content */}
            <ProfileContent onMenuItemPressed={(item: any) => {
                console.log(item)
                if (item.id == 2) {
                    navigation.navigate("EditProfile", { profileData: data });
                }
            }} />
            {/* Logout Button */}
            <ButtonBottomLogout onClick={() => {
                //navigation.goBack();
            }} />
        </View>
    )
}