import React from 'react'
import { ActivityIndicator, Modal } from "react-native";
import { GlobalStyle } from '../../constants/styles';

export const ProgressBar = ({ isLoading }: any) => {
    return (
        <Modal transparent={true} visible={true}>
            {/* Add your loading indicator or any content for the progress dialog */}
            {/* For example, you can use ActivityIndicator or any custom component */}
            <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
        </Modal>
    );
};