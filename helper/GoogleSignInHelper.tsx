import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleSignInData } from '../model/GoogleSignInModel';

export const handleGoogleSignIn = async (callback: (data: GoogleSignInData | null, error?: string) => void) => {
    try {
        await GoogleSignin.signOut();
        console.log('User signed out successfully');
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);

        // Convert the user info to GoogleSignInData
        const googleSignInData = GoogleSignInData.fromJson(userInfo);

        // Send the data to the callback
        callback(googleSignInData);
    } catch (error: any) {
        console.log('Google Sign-In Error:', error);

        let errorMessage = 'An unknown error occurred.';
        if (error.code) {
            switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    errorMessage = 'IN_PROGRESS';
                    break;
                case statusCodes.SIGN_IN_CANCELLED:
                    errorMessage = 'SIGN_IN_CANCELLED';
                    break;
                case statusCodes.SIGN_IN_REQUIRED:
                    errorMessage = 'SIGN_IN_REQUIRED';
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    errorMessage = 'PLAY_SERVICES_NOT_AVAILABLE';
                    break;
                default:
                    errorMessage = 'An unknown error occurred during Google Sign-In.';
            }
        }

        // Send the error to the callback
        callback(null, errorMessage);
    }
};