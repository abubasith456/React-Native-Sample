import { View } from "react-native";
import { useEffect, useState } from "react";
import { HeaderCard } from "../components/profile_component/headerCard/HeaderCard";
import { ProfileContent } from "../components/profile_component/ProfileContent/ProfileContent";
import { ButtonBottomLogout } from "../components/profile_component/ProfileContent/ButtonBottomLogout";
import { fetchProfile } from "../core/api/UserRepo";
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { deleteUserData, getUserData } from "../core/local_storage/LocalStorage";

const headerIconUrl: string = "";
const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UDpyRVcLyyOViNVGvvk-TRAbmWfif0nemg&s";

export const ProfileScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state: RootState) => state.profileApi);
    
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
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Profile Header Content */}
            <HeaderCard
                usernameTitle={data?.username}
                userSubTitile={data?.email}
                profileUrl={data?.profilePic || profilePic} // 🔥 Fallback to default profile image
                headerIconUrl={headerIconUrl}
                backPressNeeded={false}
                onBackButtonPress={() => navigation.goBack()}
            />
            {/* Profile Bottom Content */}
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
        </View>
    );
};
