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

export const EditProfileScreen = ({ route }: any) => {
    const dispatch = useAppDispatch();
    const { data, updateError }
        = useAppSelector((state: RootState) => state.profileApi);
    const [name, setName] = useState(data?.username);
    const [email, setEmail] = useState(data?.email || '');
    const [phone, setPhone] = useState(data?.mobileNumber || '');
    const [profilePicture, setProfilePicture] = useState(data?.profilePic || '');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (updateError) {
            Alert.alert("Error!", updateError?.toString())
        }
    }, [])

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
            // Move the image to a more permanent location
            const fileUri = result.assets[0].uri;
            setProfilePicture(fileUri);
            setFileName(result.assets[0].fileName as string)
            // try {
            //     const newFileUri = FileSystem.documentDirectory + 'userProfile.jpg';
            //     await FileSystem.moveAsync({
            //         from: fileUri,
            //         to: newFileUri
            //     });
            //     setProfilePicture(newFileUri);
            //     console.log("Image moved to:", newFileUri);
            //     // You can now upload the file from the new location
            // } catch (error) {
            //     console.error("Error moving file:", error);
            // }
        }

        // if (!result.canceled) {
        //     setProfilePicture(result.assets[0].uri); // Adjusted for new response structure
        // }
    };

    const handleSave = () => {
        // Handle saving profile logic here
        console.log("handleSave .............")
        dispatch(updateProfile({
            userId: data?.unique_id,
            username: name,
            image: profilePicture,
            filname: fileName,
            email: email,
            mobileNumber: data?.mobileNumber
        }));
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.profilePictureContainer}>
                <TouchableOpacity onPress={handlePickImage}>
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
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        padding: 20,
        backgroundColor: '#FF6F00',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
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
});
