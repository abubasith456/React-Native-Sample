import { SafeAreaView, StatusBar, View } from "react-native";
import { useEffect, useState } from "react";
import { HeaderCard } from "../components/profile_component/headerCard/HeaderCard";
import { ProfileContent } from "../components/profile_component/ProfileContent/ProfileContent";
import { ButtonBottomLogout } from "../components/profile_component/ProfileContent/ButtonBottomLogout";
import { fetchProfile } from "../core/api/UserRepo";
import { RootState, resetState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { deleteUserData, getUserData } from "../core/local_storage/LocalStorage";
import { GlobalStyle } from "../constants/styles";
import CustomBody from "../components/base_components/CustomBody";

const headerIconUrl: string = "";
const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UDpyRVcLyyOViNVGvvk-TRAbmWfif0nemg&s";

export const ProfileScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { profileData: data } = useAppSelector((state: RootState) => state.profileApi);

    // 🔥 Store userId in state
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (!data) {  // ✅ Only fetch if data is missing
            handleRetrieve();
        }
    }, []);

    const handleRetrieve = async () => {
        const retrievedData = await getUserData();
        if (retrievedData?.user_id) {
            setUserId(retrievedData.user_id);
            dispatch(fetchProfile({ userId: retrievedData.user_id }));
        }
    };

    const handleDelete = async () => {
        await deleteUserData();
        dispatch(resetState());
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
        }}>
            {/* Profile Header Content */}
            <HeaderCard
                usernameTitle={data?.username}
                userSubTitile={data?.email}
                profileUrl={data?.profilePic || profilePic}
                headerIconUrl={headerIconUrl}
                backPressNeeded={false}
                onBackButtonPress={() => navigation.goBack()}
            />
            {/* Profile Bottom Content */}
            <CustomBody>
                <ProfileContent
                    onMenuItemPressed={(item: any) => {
                        if (item.screenName) {
                            navigation.navigate(item.screenName, {
                                userId,
                                profileData: data,
                            });
                        }
                    }}
                />
                {/* Logout Button */}
                <ButtonBottomLogout onClick={handleDelete} />
            </CustomBody>
        </SafeAreaView >
    );
};
