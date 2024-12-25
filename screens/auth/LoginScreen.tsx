import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { BaseView } from "../../components/base_components/BaseView";
import { GlobalStyle } from "../../constants/styles";
import { RootState, useAppDispatch, useAppSelector } from "../../core/state_management/store";
import { emailValidator, passwordValidator } from "../../helper/Validators";
import { resetForm, setEmail, setPassword, showDialog, toggleShowPassword } from "../../core/state_management/screen_slice/LoginSlice";
import TextInput from "../../components/base_components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import CenteredButton from "../../components/base_components/CenteredButton";
import { useEffect } from "react";
import { login } from "../../core/api/UserRepo";
import LoadingModal from "../../components/base_components/LodingModal";
import CustomMessageDialog from "../../components/base_components/CustomMessageDialog";
import { saveUserData } from "../../core/local_storage/LocalStorage";
import { resetState } from "../../core/state_management/api_slice/LoginSlice";

export const LoginScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { email, password, showPassword, dialog } = useAppSelector(
        (state: RootState) => state.login
    );
    const { data, isLoader, isError, errorMessage } = useAppSelector(
        (state: RootState) => state.loginApi
    );

    console.log(" data ===> ", data)

    useEffect(() => {
        if (!!data) {
            if (!!data.userData) {
                const userData = {
                    user_id: data.userData?.user_id,
                    username: data.userData?.username,
                    email: data.userData?.email,
                    dateOfBirth: data.userData?.dateOfBirth,
                    mobileNumber: data.userData?.mobileNumber,
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

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            dispatch(setEmail({ ...email, error: emailError }));
            dispatch(setPassword({ ...password, error: passwordError }));
            return;
        }
        const emailData = email.value;
        const passwordData = password.value;
        const googleToken = null
        dispatch(login({ emailData, passwordData, googleToken }));
    };

    const handleSave = async (userData: any) => {
        await saveUserData(userData);
        dispatch(resetForm());
        dispatch(resetState())
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

    return (
        <BaseView>
            {/* Modal with Custom loader */}
            <LoadingModal isVisible={isLoader} type="normal" />
            <CustomMessageDialog
                isVisible={dialog.visible}
                message={errorMessage}
                type={dialog.type}
                onClose={() => {
                    console.log("onClose")
                    dispatch(showDialog({
                        visible: false
                    }))
                }}
            />
            <View style={styles.container}>
                {/* Logo */}
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../assets/favicon.png")}
                />

                <Text style={styles.title}>Loging</Text>
                <Text style={styles.subtitle}>Enter your emails and password</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text: any) => dispatch(setEmail({ value: text, error: '' }))}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text: string) => {
                                dispatch(setPassword({ value: text, error: '' }));
                            }}
                            error={!!password.error}
                            errorText={password.error}
                            secureTextEntry={!showPassword}  // Toggle secureTextEntry based on state
                        />
                        <TouchableOpacity onPress={() => { dispatch(toggleShowPassword()) }} style={styles.icon}>
                            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => {
                    dispatch(resetForm());
                }} style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <CenteredButton
                    title="Login"
                    onPress={onLoginPressed}
                    style={styles.button}
                />

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        dispatch(resetForm());
                        navigation.navigate({
                            name: 'Signup',
                            //params: { registrationType: "number" }
                        })
                    }}>
                        <Text style={styles.signUpLink}>Singup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BaseView >
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 80, // Adjust height as needed
        width: "100%",  // Adjust width as needed
        marginBottom: 25,
        marginTop: 50
    },
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 0,
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
        marginBottom: 40
    },
    inputContainer: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    forgotPassword: {
        color: '#666',
        fontSize: 14
    },
    button: {
        paddingVertical: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    signUpText: {
        fontSize: 14,
        color: '#666'
    },
    signUpLink: {
        fontSize: 14,
        color: GlobalStyle.primaryButtonColor,
        marginLeft: 5
    }
});