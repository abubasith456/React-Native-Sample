import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalStyle } from '../constants/styles';
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { updateProfile } from '../core/api/UserRepo';
import * as FileSystem from 'expo-file-system';
import CustomMessageDialog from '../components/base_components/CustomMessageDialog';
import { resetState } from '../core/state_management/api_slice/ProfileSlice';

export const EditProfileScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { profileData: data, dialog, error } = useAppSelector((state: RootState) => state.profileApi);
    const [name, setName] = useState(data?.username);
    const [email, setEmail] = useState(data?.email || '');
    const [phone, setPhone] = useState(data?.mobileNumber || '');
    const [profilePicture, setProfilePicture] = useState(data?.profilePic || '');
    const [fileName, setFileName] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    // Set the header right button for edit mode
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleEditMode}>
                    <Text style={styles.editButtonText}>
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [isEditMode]);

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            setProfilePicture(fileUri);
            setFileName(result.assets[0].fileName as string);
        }
    };

    const handleSave = () => {
        dispatch(updateProfile({
            userId: data?.unique_id,
            username: name,
            image: profilePicture ?? data?.profilePic,
            filname: fileName,
            email: email,
            mobileNumber: phone,
        }));
        setIsEditMode(false); // Exit edit mode after saving
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <CustomMessageDialog
                isVisible={dialog.visible}
                message={dialog.message}
                type={error ? 'error' : 'success'}
                onClose={() => {
                    console.log("onClose")
                    // dispatch(showDialog({
                    //     visible: false
                    // }))
                    dispatch(resetState())
                }}
            />
            <View style={styles.profilePictureContainer}>
                <TouchableOpacity onPress={handlePickImage} disabled={!isEditMode}>
                    {profilePicture ? (
                        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>Add Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    editable={isEditMode}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    editable={false}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    editable={isEditMode}
                    keyboardType="phone-pad"
                />
            </View>

            {isEditMode && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: GlobalStyle.primaryColor,
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666',
        fontSize: 14,
    },
    form: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    saveButton: {
        marginHorizontal: 20,
        marginVertical: 30,
        backgroundColor: GlobalStyle.primaryColor,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyle.primaryColor,
        marginRight: 16,
    },
});

export default EditProfileScreen;