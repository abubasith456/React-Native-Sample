import { HeaderProfile } from "./HeaderProfile";
import CustomHeader from "../../base_components/CustomHeader";

export const HeaderCard = ({ profileUrl, headerIconUrl, usernameTitle, userSubTitile, backPressNeeded, onBackButtonPress }: any) => {
    return (
        <CustomHeader>
            <HeaderProfile
                usernameTitle={usernameTitle}
                userSubTitile={userSubTitile}
                profilePicUrl={profileUrl} />
        </CustomHeader>
    )
}