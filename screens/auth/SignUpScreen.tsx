import { BaseView } from "../../components/base_components/BaseView";
import { emailValidator, nameValidator, passwordValidator } from "../../helper/Validators";
import { RootState, useAppDispatch, useAppSelector } from "../../core/state_management/store";
import { setDateOfBirth, setEmail, setMobileNumber, setName, setPassword, showDialog, tapShowDatePicker, toggleShowPassword } from "../../core/state_management/screen_slice/SignupSlice";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyle } from "../../constants/styles";
import BackButton from "../../components/base_components/BackButton";
import TextInput from "../../components/base_components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CenteredButton from "../../components/base_components/CenteredButton";
import { useEffect, useState } from "react";
import { register } from "../../core/api/UserRepo";
import LoadingModal from "../../components/base_components/LodingModal";
import { saveUserData } from "../../core/local_storage/LocalStorage";
import CustomMessageDialog from "../../components/base_components/CustomMessageDialog";


export const SignUpScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const {
        name,
        email,
        mobileNumber,
        password,
        showPassword,
        registrationType,
        showDatePicker,
        dateOfBirth,
        dialog
    } = useAppSelector((state: RootState) => state.signUp);
    // const [date, setDate] = useState<Date>();
    const date = dateOfBirth ? new Date(dateOfBirth) : new Date();
    const { data, isLoader, isError, errorMessage } = useAppSelector(
        (state: RootState) => state.signUpApi
    );

    console.log('data -> ', data);

    useEffect(() => {
        console.log("User effect called")
        if (!!data) {
            console.log("!!data")
            if (!!data.userData) {
                const userData = {
                    user_id: data.userData?.user_id,
                    username: data.userData?.username,
                    email: data.userData?.email,
                    dateOfBirth: data.userData?.dateOfBirth,
                    mobileNumber: date.toISOString().split('T')[0]
                };
                handleSave(userData);
            }
        } else {
            console.log("Error called")
            if (isError) {
                dispatch(showDialog({
                    visible: true,
                    message: errorMessage,
                    type: 'info'
                }))
            }
        }
    }, [data, errorMessage, dispatch]);


    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const passwordError = passwordValidator(password.value);
        let emailError = '';
        let mobileNumberError = '';

        if (registrationType === 'email') {
            emailError = emailValidator(email.value);
        } else {
            mobileNumberError = mobileNumber.value ? '' : 'Mobile number is required';
        }

        if (
            nameError ||
            passwordError ||
            (registrationType === 'email' && emailError) ||
            (registrationType === 'mobile' && mobileNumberError) ||
            !date
        ) {
            dispatch(setName({ ...name, error: nameError }));
            dispatch(setEmail({ ...email, error: emailError }));
            dispatch(setMobileNumber({ ...mobileNumber, error: mobileNumberError }));
            dispatch(setPassword({ ...password, error: passwordError }));
            return;
        }

        const payload = {
            usernameValue: name.value,
            emailValue: email.value,
            mobileValue: mobileNumber.value,
            passwordValue: password.value,
            dateOfBirth: date.toISOString().split('T')[0],
        };
        dispatch(register(payload));
    };

    const handleSave = async (userData: any) => {
        await saveUserData(userData);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'HomeScreen',
                params: {
                    userId: userData.user_id,
                },
            }],
        })
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            // Ensure selectedDate is a Date object
            const dateToSave = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString()
                : null; // Check if valid date

            if (dateToSave) {
                // Dispatch the selected date (convert back to ISO string before dispatching)
                dispatch(setDateOfBirth(dateToSave));
            }
        }
        dispatch(tapShowDatePicker(false));
    };

    const handleShowDatePicker = () => {
        dispatch(tapShowDatePicker(true));
    };

    function goBack() {
        navigation.goBack();
    }

    return (
        <BaseView>
            <View style={styles.container}>
                {/* Modal with Custom loader */}
                <LoadingModal isVisible={isLoader} type="normal" />
                <CustomMessageDialog
                    isVisible={dialog.visible}
                    message={errorMessage}
                    type={dialog.type}
                    onClose={() => {
                        dispatch(showDialog({
                            visible: false
                        }))
                    }}
                />
                {/* Header Back Button */}
                <BackButton goBack={goBack} />
                {/* Logo */}
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../assets/favicon.png")}
                />
                {/* Title and Subtitle */}
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter your credentials to continue</Text>
                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={(text: string) => dispatch(setName({ value: text, error: '' }))}
                        error={!!name.error}
                        errorText={name.error}
                    />
                </View>
                {/* Email Input */}
                {registrationType === 'email' ? <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text: string) => dispatch(setEmail({ value: text, error: '' }))}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                </View>
                    : <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            label="Mobile Number"
                            returnKeyType="next"
                            value={mobileNumber.value}
                            onChangeText={(text: string) => dispatch(setMobileNumber({ value: text, error: '' }))}
                            error={!!mobileNumber.error}
                            errorText={mobileNumber.error}
                            keyboardType="phone-pad"
                        />
                    </View>
                }
                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text: string) => dispatch(setPassword({ value: text, error: '' }))}
                            error={!!password.error}
                            errorText={password.error}
                            secureTextEntry={!showPassword}  // Toggle secureTextEntry based on state
                        />
                        <TouchableOpacity onPress={() => dispatch(toggleShowPassword())} style={styles.icon}>
                            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Date Picker */}
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: GlobalStyle.primary, fontWeight: "bold" }} >Date of birth: </Text>
                        <Text>{date ? date.toISOString().split('T')[0] : ''}</Text>
                    </View>
                    <Text style={{ color: GlobalStyle.primary }} onPress={handleShowDatePicker}>
                        Select Date
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
                {/* Sign Up Button */}
                <CenteredButton
                    title="Sign Up"
                    onPress={onSignUpPressed}
                    style={styles.button}
                />
            </View>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 0,
    },
    logo: {
        height: 80, // Adjust height as needed
        width: "100%",  // Adjust width as needed
        marginBottom: 25,
        marginTop: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30
    },
    inputContainer: {
        marginBottom: 10
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    button: {
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 20,
    },
    gradient: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#8e8e8e',
    },
    footerLink: {
        fontSize: 14,
        color: GlobalStyle.primaryColor,
        fontWeight: 'bold',
    },
});